FROM golang

WORKDIR /go/src/app

COPY . .

RUN go build -o ./bin

CMD ["go", "run", "."]