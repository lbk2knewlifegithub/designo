FROM lukemathwalker/cargo-chef:latest-rust-1.59.0 AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
RUN apt update -y
RUN apt-get install clang libclang-dev pkg-config libssl-dev -y
COPY --from=planner /app/recipe.json recipe.json
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --release --recipe-path recipe.json
# Build application
COPY . .
RUN cargo build --bin images --release 

# We do not need the Rust toolchain to run the binary!
FROM debian:bullseye-slim AS runtime
WORKDIR /app
COPY --from=builder /app/target/release/images /usr/local/bin
ENTRYPOINT ["/usr/local/bin/images"]