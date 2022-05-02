// use actix_cors::Cors;
// use actix_web::middleware::Logger;
// use actix_web::{web, App, HttpServer};
// use prelude::{
//     config::Config,
//     services::{db_service::DBService, jwt_service::JWTService},
// };

// mod handlers;
// mod upload_repo;
// mod upload_service;
// mod utils;

// #[derive(Clone)]
// pub struct ImagesState {
//     pub jwt: JWTService,
//     pub db: DBService,
// }

// impl ImagesState {
//     pub fn new(jwt: JWTService, db: DBService) -> Self {
//         Self { jwt, db }
//     }
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     Config::init();

//     let images_state = ImagesState::new(JWTService::from_env(), DBService::from_env());

//     // Create Static Folder to storage images
//     std::fs::create_dir_all("./static")?;

//     HttpServer::new(move || {
//         App::new()
//             // Add Images State
//             .app_data(web::Data::new(images_state.clone()))
//             .app_data(web::JsonConfig::default().limit(4096))
//             .app_data(web::PayloadConfig::new(50_242_880))
//             .wrap(Cors::permissive())
//             .wrap(Logger::default())
//             .configure(handlers::upload_handler::configure)
//             .configure(handlers::image_handler::configure)
//     })
//     .bind(("0.0.0.0", 8081))?
//     .run()
//     .await
// }

fn main() {}
