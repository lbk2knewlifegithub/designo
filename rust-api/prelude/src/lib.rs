use crate::errors::AppError;
use actix_web::HttpResponse;
use sqlx::Postgres;

pub mod config;
pub mod errors;
pub mod models;
pub mod services;
pub mod utils;

pub type Pool = sqlx::Pool<Postgres>;
pub type Transaction<'a> = sqlx::Transaction<'a, Postgres>;

pub type Result<T> = std::result::Result<T, AppError>;

pub fn convert<T, E>(res: std::result::Result<T, E>) -> std::result::Result<HttpResponse, AppError>
where
    T: serde::Serialize,
    AppError: From<E>,
{
    res.map(|d| HttpResponse::Ok().json(d)).map_err(Into::into)
}
