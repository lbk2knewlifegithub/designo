use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct AuthRespose {
    pub access_token: String,
    pub refresh_token: String,
}

#[derive(Debug, Deserialize)]
pub struct SignUpResponse {}
