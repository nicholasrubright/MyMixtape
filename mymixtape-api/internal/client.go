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
)

type Doer interface {
	Do(r *http.Request) (*http.Response, error)
}

type IClient interface {
	GetInto(endpoint string, target interface{}, token string) *constants.ApiError
	PostInto(endpoint string, body interface{}, target interface{}, token string) *constants.ApiError
	Get(endpoint string, token string) (*http.Response, error)
	Post(endpoint string, body interface{}, token string) (*http.Response, error)
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

	if response.StatusCode == http.StatusServiceUnavailable {
		time.Sleep(time.Second)
		response, err = c.HTTP_CLIENT.Do(request)
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
		return c.DoRequest(method, endpoint, body, token)
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

func (c Client) NewRequest(method string, endpoint string, body io.Reader, token string) (*http.Request, error) {
	request, err := http.NewRequest(method, constants.API_URL + endpoint, body)

	if err != nil {
		return nil, err
	}

	request.Header.Add("Authorization", "Bearer " + token)
	request.Header.Add("Accept", "application/json")

	return request, nil
}