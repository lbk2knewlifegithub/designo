use crate::errors::AppError;

use actix_web::HttpResponse;

pub mod config;
pub mod errors;
pub mod models;
pub mod services;

pub type Pool = deadpool_postgres::Pool;

pub type Result<T> = std::result::Result<T, AppError>;

pub fn convert<T, E>(res: std::result::Result<T, E>) -> std::result::Result<HttpResponse, AppError>
where
    T: serde::Serialize,
    AppError: From<E>,
{
    res.map(|d| HttpResponse::Ok().json(d)).map_err(Into::into)
}
