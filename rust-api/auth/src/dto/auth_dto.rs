use serde::Deserialize;
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]

pub struct Credentials {
    #[validate(length(min = 3, max = 40))]
    pub username: String,

    #[validate(length(min = 8, max = 50))]
    pub password: String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct Token {
    pub token: String,
}
