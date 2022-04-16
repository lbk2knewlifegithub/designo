use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
use prelude::{
    config::Config,
    services::{
        db_service::DBService, hasher_service::HashService, jwt_service::JWTService,
        redis_service::RedisService,
    },
};

mod dto;
mod handlers;
mod models;
mod repos;
mod services;

#[derive(Clone)]
pub struct AuthState {
    pub jwt: JWTService,
    pub hasher: HashService,
    // pub email: EmailService,
    pub redis: RedisService,
    pub db: DBService,
}

impl AuthState {
    pub fn new(
        hasher: HashService,
        jwt: JWTService,
        // email: EmailService,
        redis: RedisService,
        db: DBService,
    ) -> Self {
        Self {
            jwt,
            hasher,
            db,
            // email,
            redis,
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Config::init();

    let auth_state = AuthState::new(
        HashService {},
        JWTService::from_env(),
        // EmailService::from_env(),
        RedisService::from_env().await,
        DBService::from_env(),
    );

    HttpServer::new(move || {
        App::new()
            // Autn State
            .app_data(web::Data::new(auth_state.clone()))
            .app_data(web::JsonConfig::default().limit(4096))
            .app_data(web::PayloadConfig::new(50_242_880))
            .wrap(Cors::permissive())
            .wrap(Logger::default())
            .configure(handlers::user_handler::configure)
            // .configure(user_handler::configure)
            .configure(handlers::auth_handler::configure)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
