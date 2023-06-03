package server

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/mymixtape-api/spotify/models"
	"github.com/mymixtape-api/utils"
)

const (
	API_URL = "https://api.spotify.com/v1"

	// Access Token
	ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token"
	GRANT_TYPE = "authorization_code"
)


type Doer interface {
	Do(r *http.Request) (*http.Response, error)
}

type RequestManager struct {
	Client 	Doer
	Token	string
}

func NewRequestManager(client Doer) *RequestManager {
	return &RequestManager{
		Client: client,
	}
}

func (rm *RequestManager) SetToken(code string, redirect_uri string, client_id string, client_secret string) error {
	
	formData := url.Values{
		"grant_type": {GRANT_TYPE},
		"code": {code},
		"redirect_uri": {redirect_uri},
	}

	request, err := http.NewRequest("POST", ACCESS_TOKEN_URL, strings.NewReader(formData.Encode()))

	if err != nil {
		return err
	}

	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Add("Authorization", "Basic " + utils.GetEncodedClientCredentials(client_id, client_secret))

	response, err := rm.Client.Do(request)

	if err != nil {
		return err
	}

	if response.StatusCode == http.StatusServiceUnavailable {
		time.Sleep(time.Second)
		response, err = rm.Client.Do(request)
		if err != nil {
			return err
		}
	}

	if response.StatusCode < 200 || response.StatusCode > 299 {
		err, ok := utils.StatusToError[response.StatusCode]

		if !ok {
			err = utils.Error{
				Message: "unknown error reason",
				StatusCode: response.StatusCode,
			}
		}
		return err
	}

	var accessTokenResponse *models.SpotifyAccessTokenResponse

	if err := json.NewDecoder(response.Body).Decode(&accessTokenResponse); err != nil {
		return err
	}

	rm.Token = accessTokenResponse.AccessToken

	return nil
}

func (rm *RequestManager) GetInto(endpoint string, target interface{}) error {
	response, err := rm.Get(endpoint)

	if err != nil {
		return err
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		return err
	}

	return nil
}

func (rm *RequestManager) PostInto(endpoint string, body, target interface{}) error {
	response, err := rm.Post(endpoint, body)

	if err != nil {
		return err
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		return err
	}

	return nil
}

func (rm *RequestManager) Get(endpoint string) (*http.Response, error) {
	return rm.DoRequest("GET", endpoint, nil)
}

func (rm *RequestManager) Post(endpoint string, body interface{}) (*http.Response, error) {
	buf := &bytes.Buffer{}

	if err := json.NewEncoder(buf).Encode(body); err != nil {
		return nil, err
	}

	return rm.DoRequest("POST", endpoint, buf)
}

func (rm *RequestManager) DoRequest(method, endpoint string, body io.Reader) (*http.Response, error) {
	request, err := rm.NewRequest(method, endpoint, body)

	if err != nil {
		return nil, err
	}

	response, err := rm.Client.Do(request)

	if err != nil {
		return nil, err
	}

	if response.StatusCode == http.StatusServiceUnavailable {
		time.Sleep(time.Second)
		response, err = rm.Client.Do(request)
		if err != nil {
			return nil, err
		}
	}

	if response.StatusCode == http.StatusTooManyRequests {
		retry := response.Header.Get("Retry-After")
		seconds, err := strconv.Atoi(retry)
		if err != nil {
			return nil, err
		}

		time.Sleep(time.Duration(seconds) * time.Second)
		return rm.DoRequest(method, endpoint, body)
	}

	if response.StatusCode < 200 || response.StatusCode > 299 {
		err, ok := utils.StatusToError[response.StatusCode]

		if !ok {
			err = utils.Error{
				Message: "unknown error reason",
				StatusCode: response.StatusCode,
			}
		}
		return nil, err
	}

	return response, nil
}

func (rm *RequestManager) NewRequest(method, endpoint string, body io.Reader) (*http.Request, error) {
	request, err := http.NewRequest(method, API_URL + endpoint, body)

	if err != nil {
		return nil, err
	}

	request.Header.Add("Authorization", "Bearer " + rm.Token)
	request.Header.Add("Accept", "application/json")

	return request, nil
}