const defaultMessage = "There was an unexpected error using the api.";

export class ApiError extends Error {
  httpStatusCode: number;
  url: string;

  constructor(
    httpStatusCode: number,
    url: string,
    message: string = defaultMessage
  ) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.url = url;
  }
  getStatusCode(): number {
    return this.httpStatusCode;
  }
}
