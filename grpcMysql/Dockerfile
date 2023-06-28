FROM golang:alpine
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /grpcmysql
EXPOSE 3002
CMD [ "/grpcmysql" ]