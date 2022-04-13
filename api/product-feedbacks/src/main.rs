use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use prelude::{
    config::Config,
    services::{db_service::DBService, jwt_service::JWTService},
};

mod dto;
mod handlers;
mod models;
mod repos;
mod services;

#[derive(Clone)]
pub struct FeedbacksState {
    pub jwt: JWTService,
    pub db: DBService,
}

impl FeedbacksState {
    pub fn new(jwt: JWTService, db: DBService) -> Self {
        Self { jwt, db }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Config::init();

    let feedbacks_state = FeedbacksState::new(JWTService::from_env(), DBService::from_env());

    HttpServer::new(move || {
        App::new()
            // Add Feedbacks State
            .app_data(web::Data::new(feedbacks_state.clone()))
            .app_data(web::JsonConfig::default().limit(4096))
            .wrap(Cors::permissive())
            .wrap(Logger::default())
            .configure(handlers::feedback_handler::configure)
    })
    .bind(("0.0.0.0", 8082))?
    .run()
    .await
}
