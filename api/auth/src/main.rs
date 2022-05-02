use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
use prelude::{
    config::Config,
    services::{db_service::DBService, jwt_service::JWTService, redis_service::RedisService},
};

mod dto;
mod handlers;
mod models;
mod repos;
mod services;

use services::github_service::GithubService;

#[derive(Clone)]
pub struct AuthState {
    pub jwt: JWTService,
    // pub email: EmailService,
    pub redis: RedisService,
    pub github: GithubService,
    pub db: DBService,
}

impl AuthState {
    pub fn new(
        jwt: JWTService,
        // email: EmailService,
        redis: RedisService,
        github: GithubService,
        db: DBService,
    ) -> Self {
        Self {
            jwt,
            db,
            github,
            redis,
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Config::init();

    let auth_state = AuthState::new(
        JWTService::from_env(),
        // EmailService::from_env(),
        RedisService::from_env().await,
        GithubService::from_env(),
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
            // .configure(handlers::user_handler::configure)
            // .configure(user_handler::configure)
            .configure(handlers::auth_handler::configure)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
