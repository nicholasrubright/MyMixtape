package internal

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/mymixtape-api/constants"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/utils"
)

type Doer interface {
	Do(r *http.Request) (*http.Response, error)
}

type IClient interface {
	Get(endpoint string, token string) (*http.Response, error)
	Post(endpoint string, body interface{}, token string) (*http.Response, error)
	GetInto(endpoint string, target interface{}, token string) *constants.ApiError
	PostInto(endpoint string, body interface{}, target interface{}, token string) *constants.ApiError
	PostAccessToken(endpoint string, body interface{}, target interface{}) *constants.ApiError
	DoRequest(method string, endpoint string, body io.Reader, token string) (*http.Response, error)
	NewRequest(method string, endpoint string, body io.Reader, token string) (*http.Request, error)
}

type Client struct {
	HTTP_CLIENT Doer
}

func New(httpClient Doer) Client {
	return Client{
		HTTP_CLIENT: httpClient,
	}
}

func (c Client) GetInto(endpoint string, target interface{}, token string) *constants.ApiError {

	response, err := c.Get(endpoint, token)

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

func (c Client) PostInto(endpoint string, body interface{}, target interface{}, token string) *constants.ApiError {
	response, err := c.Post(endpoint, body, token)

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

func (c Client) Get(endpoint string, token string) (*http.Response, error) {
	return c.DoRequest("GET", endpoint, nil, token)
}

func (c Client) Post(endpoint string, body interface{}, token string) (*http.Response, error) {
	buf := &bytes.Buffer{}

	if err := json.NewEncoder(buf).Encode(body); err != nil {
		return nil, err
	}

	return c.DoRequest("POST", endpoint, buf, token)
}

func (c Client) DoRequest(method string, endpoint string, body io.Reader, token string) (*http.Response, error) {
	request, err := c.NewRequest(method, endpoint, body, token)

	if err != nil {
		return nil, err
	}

	response, err := c.HTTP_CLIENT.Do(request)

	if err != nil {
		return nil, err
	}

	response, apiErr := checkStatus(response, request, &c)

	if apiErr != nil {
		return nil, errors.New(apiErr.ApiError())
	}

	return response, nil
}

func (c Client) NewRequest(method string, endpoint string, body io.Reader, token string) (*http.Request, error) {
	request, err := http.NewRequest(method, constants.API_URL + endpoint, body)

	if err != nil {
		return nil, err
	}

	request.Header.Add("Authorization", "Bearer " + token)
	request.Header.Add("Accept", "application/json")

	return request, nil
}


func (c Client) PostAccessToken(endpoint string, body interface{}, target interface{}, client_id string, client_secret string) (*models.AccessTokenResponse, *constants.ApiError) {

	buf := &bytes.Buffer{}

	if err := json.NewEncoder(buf).Encode(body); err != nil {
		return nil, &constants.ErrInternalServerError
	}

	request, err := http.NewRequest("POST", endpoint, buf)

	if err != nil {
		return nil, &constants.ErrInternalServerError
	}

	clientCredentials := utils.GetEncodedClientCredentials(client_id, client_secret)

	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Add("Authorization", "Basic " + clientCredentials)

	response, err := c.HTTP_CLIENT.Do(request)

	if err != nil {
		return nil, &constants.ErrInternalServerError
	}

	var spotifyAccessTokenResponse *models.SpotifyAccessTokenResponse

	if err := json.NewDecoder(response.Body).Decode(&spotifyAccessTokenResponse); err != nil {
		return nil, &constants.ErrInternalServerError
	}

	tokenExpiration := time.Now().Add(time.Duration(spotifyAccessTokenResponse.ExpiresIn) * time.Second)

	return &models.AccessTokenResponse {
		Token: spotifyAccessTokenResponse.AccessToken,
		Expires: tokenExpiration.Format(constants.TIME_FORMAT),
	}, nil

}

func checkStatus(response *http.Response, request *http.Request, client *Client) (*http.Response, *constants.ApiError) {

	if response.StatusCode == http.StatusServiceUnavailable {
		time.Sleep(time.Second)
		response, err := client.HTTP_CLIENT.Do(request)
		if err != nil {
			return nil, &constants.ErrInternalServerError
		}

		return response, nil
	}

	if response.StatusCode == http.StatusTooManyRequests {
		retry := response.Header.Get("Retry-After") 
		seconds, err := strconv.Atoi(retry)
		if err != nil {
			return nil, &constants.ErrInternalServerError
		}

		time.Sleep(time.Duration(seconds) * time.Second)
		
		response, err := client.HTTP_CLIENT.Do(request)
		if err != nil {
			return nil, &constants.ErrInternalServerError
		}

		return response, nil
	}

	if response.StatusCode < 200 || response.StatusCode > 299 {
		_, ok := constants.StatusToError[response.StatusCode]

		if !ok {
			return nil, &constants.ApiError{
				Message: "unkown error reason",
				StatusCode: response.StatusCode,
			}
		}

		return nil, &constants.ErrInternalServerError
	}

	return response, nil


}