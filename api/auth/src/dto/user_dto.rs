use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct CreateUserDTO {
    #[validate(length(min = 3, max = 40))]
    pub firstname: String,

    #[validate(length(min = 3, max = 40))]
    pub lastname: String,

    #[validate(length(min = 3, max = 40))]
    pub username: String,

    #[validate(length(min = 8, max = 50))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct ChangePasswordDTO {
    #[validate(length(min = 8, max = 50))]
    #[serde(rename(deserialize = "newPassword"))]
    pub new_password: String,

    #[validate(length(min = 8, max = 50))]
    #[serde(rename(deserialize = "oldPassword"))]
    pub old_password: String,
}

#[derive(Deserialize, Validate)]
pub struct DeleteAccountDTO {
    #[validate(length(min = 8, max = 50))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct UpdateAccountDTO {
    #[validate(length(min = 3, max = 40))]
    pub firstname: String,

    #[validate(length(min = 3, max = 40))]
    pub lastname: String,

    #[validate(email)]
    pub email: String,
}

#[derive(Deserialize, Validate)]
pub struct UsernameExistsDTO {
    #[validate(length(min = 3, max = 40))]
    pub username: String,
}

#[derive(Deserialize, Validate)]
pub struct EmailExistsDTO {
    #[validate(email)]
    pub email: String,
}
