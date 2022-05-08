use crate::errors::auth_error::AuthError;
use crate::models::user_token::UserToken;
use crate::Result;

use actix_web::{http::header, HttpRequest};
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation};
use std::env::var;
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
        jsonwebtoken::encode(
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

    pub async fn decode(&self, token: &str) -> Result<UserToken> {
        Ok(jsonwebtoken::decode::<UserToken>(
            &token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &Validation::default(),
        )
        .map_err(|e| AuthError::from(e))?
        .claims)
    }

    /// Get token from RequestHeader Return 401 if not found
    pub fn get_token(&self, req: &HttpRequest) -> Result<String> {
        let token = req.headers().get(header::AUTHORIZATION);

        match token {
            Some(t) => {
                let banana = t.to_str().map_err(|_| AuthError::TokenNotFound)?;
                Ok(banana
                    .split_whitespace()
                    .nth(1)
                    .ok_or(AuthError::TokenNotFound)?
                    .to_string())
            }
            None => Err(AuthError::TokenNotFound.into()),
        }
    }

    /// Auth middleware
    pub async fn authorize(&self, req: &HttpRequest, require_admin: bool) -> Result<UserToken> {
        let token = self.get_token(req)?;
        let user_token = self.decode(token.as_str()).await?;

        if !user_token.admin && require_admin {
            return Err(AuthError::Forbidden.into());
        }

        Ok(user_token)
    }
}
