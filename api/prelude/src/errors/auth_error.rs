use super::AppError;
use argon2;
use derive_more::Display;
use jsonwebtoken;
use tracing::debug;

#[derive(Debug, Display)]
pub enum AuthError {
    InvalidCredentials,
    TokenInvalid,
    TokenNotFound,
}

impl From<AuthError> for AppError {
    fn from(e: AuthError) -> Self {
        let error = format!("{}", e);
        match e {
            AuthError::InvalidCredentials => {
                AppError::Unauthorize(error, "Username or password incorrect".to_owned())
            }
            AuthError::TokenInvalid => AppError::BadRequest(error, "Token valid".to_owned()),
            AuthError::TokenNotFound => AppError::BadRequest(error, "Token not found".to_owned()),
        }
    }
}

impl From<jsonwebtoken::errors::Error> for AuthError {
    fn from(e: jsonwebtoken::errors::Error) -> Self {
        debug!("JsonWebToken Error - {e}");
        match e.kind() {
            _ => AuthError::TokenInvalid,
        }
    }
}

impl From<argon2::password_hash::Error> for AuthError {
    fn from(e: argon2::password_hash::Error) -> Self {
        debug!("Argon2 Error - {e}");
        AuthError::InvalidCredentials
    }
}
