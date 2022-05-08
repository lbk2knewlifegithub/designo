use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
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
mod utils;

#[derive(Clone)]
pub struct ReportState {
    pub jwt: JWTService,
    pub db: DBService,
    pub ddos: DDosService,
    pub redis: RedisService,
}

impl ReportState {
    pub async fn new() -> Self {
        let redis = RedisService::from_env().await;
        Self {
            jwt: JWTService::from_env(),
            db: DBService::from_env(),
            ddos: DDosService::new(redis.clone()),
            redis,
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Config::init();
    let report_state = ReportState::new().await;

    HttpServer::new(move || {
        App::new()
            // Add Frontend Mentor State
            .app_data(web::Data::new(report_state.clone()))
            .app_data(web::JsonConfig::default().limit(4096))
            .wrap(Cors::permissive())
            .wrap(Logger::default())
            .configure(handlers::report_handler::configure)
    })
    .bind(("0.0.0.0", 8083))?
    .run()
    .await
}
