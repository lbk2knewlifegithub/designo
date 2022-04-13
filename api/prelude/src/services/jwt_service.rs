use crate::errors::auth_error::AuthError;
use crate::models::user_token::UserToken;
use crate::Result;

use actix_web::{http::header, HttpRequest};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::de::DeserializeOwned;
use std::env::var;
use tracing::debug;

#[derive(Clone)]
pub struct JWTService {
    jwt_secret: String,
}

impl JWTService {
    pub fn from_env() -> Self {
        let jwt_secret =
            var("JWT_SECRET").expect("Missing JWT secret key. Ex: JWT_SECRET=supersecret");

        Self { jwt_secret }
    }
}

impl JWTService {
    pub async fn hash(&self, user_token: UserToken) -> String {
        encode(
            &Header::default(),
            &user_token,
            &EncodingKey::from_secret(self.jwt_secret.as_ref()),
        )
        .expect(&format!(
            "JWTService -> hash -> Failed to encode JWT -> user_token {user_token:?}"
        ))
    }

    pub fn verify(&self, _password: &str) -> Result<String> {
        panic!("Not implemented");
    }

    pub fn decode<T>(&self, token: &str) -> Result<T>
    where
        T: DeserializeOwned,
    {
        Ok(decode::<T>(
            &token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &Validation::default(),
        )
        .map_err(|e| {
            debug!("JWTService -> decode ->  {e}; -> Token {token}",);
            e
        })?
        .claims)
    }

    /// Auth middleware
    pub async fn authorize(&self, req: &HttpRequest) -> Result<UserToken> {
        let token = req.headers().get(header::AUTHORIZATION);

        match token {
            Some(t) => {
                let banana = t.to_str().map_err(|_| AuthError::Unauthorize)?;
                let lemon = banana
                    .split_whitespace()
                    .nth(1)
                    .ok_or(AuthError::Unauthorize)?;

                Ok(self.decode::<UserToken>(lemon)?)
            }
            None => Err(AuthError::Unauthorize.into()),
        }
    }
}
