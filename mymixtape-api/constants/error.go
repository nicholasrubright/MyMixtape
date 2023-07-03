package constants

import "net/http"

type ApiError struct {
	Message string
	StatusCode int
}

func (e ApiError) ApiError() string {
	return e.Message
}

var (
	ErrBadRequest = ApiError{
		Message: "bad request",
		StatusCode: http.StatusBadRequest,
	}
	ErrUnauthorized = ApiError {
		Message: "unauthorized",
		StatusCode: http.StatusUnauthorized,
	}
	ErrForbidden = ApiError {
		Message: "forbidden",
		StatusCode: http.StatusForbidden,
	}
	ErrNotFound = ApiError{
		Message: "not found",
		StatusCode: http.StatusNotFound,
	}
	ErrRateLimitExceeded = ApiError{
		Message: "rate limit exceeded",
		StatusCode: http.StatusTooManyRequests,
	}
	ErrInternalServerError = ApiError {
		Message: "internal server error",
		StatusCode: http.StatusInternalServerError,
	}
	ErrBadGateway = ApiError{
		Message: "bad gateway",
		StatusCode: http.StatusBadGateway,
	}
	ErrServiceUnavailable = ApiError {
		Message: "service unavailable",
		StatusCode: http.StatusServiceUnavailable,
	}
	StatusToError = map[int] ApiError {
		http.StatusBadRequest: ErrBadRequest,
		http.StatusUnauthorized: ErrUnauthorized,
		http.StatusForbidden: ErrForbidden,
		http.StatusNotFound: ErrNotFound,
		http.StatusTooManyRequests: ErrRateLimitExceeded,
		http.StatusInternalServerError: ErrInternalServerError,
		http.StatusBadGateway: ErrBadGateway,
		http.StatusServiceUnavailable: ErrServiceUnavailable,
	}
)