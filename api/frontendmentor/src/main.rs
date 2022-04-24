use actix_web::{web, App, HttpServer};

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::get().to(|| async { "Frontendmentor Close" })))
        .bind(("0.0.0.0", 8084))?
        .run()
        .await
}
