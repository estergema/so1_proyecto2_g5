FROM golang:alpine
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /goapi
EXPOSE 3000
CMD [ "/goapi" ]