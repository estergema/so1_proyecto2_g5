FROM golang:alpine
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /grpcredis
EXPOSE 3001
CMD [ "/grpcredis" ]