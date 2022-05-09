FROM golang:1.18-alpine AS builder

# Move to working directory (/build).
WORKDIR /build

# Set necessary environmet variables needed for our image and build the API server.
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
# Copy and download dependency using go mod.
COPY . .
RUN cd frontendmentor && go mod download  && go build

FROM scratch

# Copy binary and config files from /build to root folder of scratch container.
COPY --from=builder ["/build/frontendmentor/frontendmentor", "/build/.env", "/"]

# Export necessary port.
EXPOSE 8084

# Command to run when starting the container.
ENTRYPOINT ["/frontendmentor"]
