use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use prelude::{
    config::Config,
    services::{
        db_service::DBService, ddos_service::DDosService, jwt_service::JWTService,
        redis_service::RedisService,
    },
};

mod dto;
mod handlers;
mod models;
mod repos;
mod services;

#[derive(Clone)]
pub struct InvoiceAppState {
    pub jwt: JWTService,
    pub db: DBService,
    pub ddos: DDosService,
}

impl InvoiceAppState {
    pub async fn init() -> Self {
        let redis = RedisService::from_env().await;
        Self {
            jwt: JWTService::from_env(),
            db: DBService::from_env(),
            ddos: DDosService::new(redis),
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Config::init();

    let invoice_app_state = InvoiceAppState::init().await;

    HttpServer::new(move || {
        App::new()
            // Add Feedbacks State
            .app_data(web::Data::new(invoice_app_state.clone()))
            .app_data(web::JsonConfig::default().limit(4096))
            .wrap(Cors::permissive())
            .wrap(Logger::default())
            .configure(handlers::invoices_handler::configure)
    })
    .bind(("0.0.0.0", 8083))?
    .run()
    .await
}
