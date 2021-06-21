FROM golang:1.16.2

RUN go get -u -v github.com/go-delve/delve/cmd/dlv
EXPOSE 2345


# All these steps will be cached
RUN mkdir /hello
WORKDIR /hello
COPY go.mod .
COPY go.sum .

# Get dependancies - will also be cached if we won't change mod/sum
RUN go mod download
# COPY the source code as the last step
COPY . .

RUN go build .

EXPOSE 8005
CMD ["dlv", "debug", "--headless", "--listen=:2345", "--log"]

