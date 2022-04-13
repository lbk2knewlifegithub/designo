use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]

pub struct Credentials {
    #[validate(length(min = 3, max = 40))]
    pub username: String,

    #[validate(length(min = 8, max = 50))]
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct Token {
    #[serde(rename = "accessToken")]
    #[validate(required)]
    pub access_token: Option<String>,
}
