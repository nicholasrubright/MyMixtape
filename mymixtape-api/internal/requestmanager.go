package internal

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/mymixtape-api/constants"
	"github.com/mymixtape-api/models"
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
}

func NewRequestManager(client Doer) *RequestManager {
	return &RequestManager{
		Client: client,
	}
}

func (rm *RequestManager) SetToken(code string, redirect_uri string, client_id string, client_secret string) (*models.AccessTokenResponse,  *constants.ApiError) {
	
	formData := url.Values{
		"grant_type": {GRANT_TYPE},
		"code": {code},
		"redirect_uri": {redirect_uri},
	}

	request, err := http.NewRequest("POST", ACCESS_TOKEN_URL, strings.NewReader(formData.Encode()))

	if err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return nil, &errObj
	}

	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Add("Authorization", "Basic " + utils.GetEncodedClientCredentials(client_id, client_secret))

	response, err := rm.Client.Do(request)

	if err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return nil, &errObj
	}

	if response.StatusCode == http.StatusServiceUnavailable {
		time.Sleep(time.Second)
		response, err = rm.Client.Do(request)
		if err != nil {
			errObj := constants.StatusToError[http.StatusInternalServerError]
			return nil, &errObj
		}
	}

	if response.StatusCode < 200 || response.StatusCode > 299 {
		err, ok := constants.StatusToError[response.StatusCode]

		if !ok {
			err = constants.ApiError{
				Message: "unknown error reason",
				StatusCode: response.StatusCode,
			}
		}
		return nil, &err
	}

	var spotifyAccessTokenResponse *models.SpotifyAccessTokenResponse

	if err := json.NewDecoder(response.Body).Decode(&spotifyAccessTokenResponse); err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return nil, &errObj
	}

	return &models.AccessTokenResponse{
		Token: spotifyAccessTokenResponse.AccessToken,
		ExpiresIn: spotifyAccessTokenResponse.ExpiresIn,
	}, nil
}

func (rm *RequestManager) GetInto(endpoint string, target interface{}, token string) *constants.ApiError {
	response, err := rm.Get(endpoint, token)

	if err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return &errObj
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return &errObj
	}

	return nil
}

func (rm *RequestManager) PostInto(endpoint string, body, target interface{}, token string) *constants.ApiError {
	response, err := rm.Post(endpoint, body, token)

	if err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return &errObj
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		errObj := constants.StatusToError[http.StatusInternalServerError]
		return &errObj
	}

	return nil
}

func (rm *RequestManager) Get(endpoint string, token string) (*http.Response, error) {
	return rm.DoRequest("GET", endpoint, nil, token)
}

func (rm *RequestManager) Post(endpoint string, body interface{}, token string) (*http.Response, error) {
	buf := &bytes.Buffer{}

	if err := json.NewEncoder(buf).Encode(body); err != nil {
		return nil, err
	}

	return rm.DoRequest("POST", endpoint, buf, token)
}

func (rm *RequestManager) DoRequest(method, endpoint string, body io.Reader, token string) (*http.Response, error) {
	request, err := rm.NewRequest(method, endpoint, body, token)

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
		return rm.DoRequest(method, endpoint, body, token)
	}

	if response.StatusCode < 200 || response.StatusCode > 299 {
		err, ok := constants.StatusToError[response.StatusCode]
		if !ok {
			err = constants.ApiError{
				Message: "unknown error reason",
				StatusCode: response.StatusCode,
			}
		}
		return nil, errors.New(err.Message)
	}

	return response, nil
}

func (rm *RequestManager) NewRequest(method, endpoint string, body io.Reader, token string) (*http.Request, error) {
	request, err := http.NewRequest(method, API_URL + endpoint, body)

	if err != nil {
		return nil, err
	}

	request.Header.Add("Authorization", "Bearer " + token)
	request.Header.Add("Accept", "application/json")

	return request, nil
}