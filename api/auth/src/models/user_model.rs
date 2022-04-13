use crate::dto::user_dto::{CreateUserDTO, UpdateAccountDTO};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, Clone, Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "users")]
pub struct User {
    pub user_id: i32,
    pub firstname: String,
    pub lastname: String,
    pub username: String,

    /**
     * - Password
     */
    #[serde(skip_serializing)]
    pub password: String,

    // #[serde(skip_serializing_if = "Option::is_none")]
    // #[serde(default)]
    // pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    pub avatar: Option<String>,

    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,

    // #[serde(skip_serializing_if = "Option::is_none")]
    // #[serde(default)]
    // pub verified: Option<bool>,
    #[serde(skip_serializing)]
    pub blocked: bool,
}

#[derive(Clone, Copy)]
pub struct NewUser<'a> {
    pub firstname: &'a str,
    pub lastname: &'a str,
    pub username: &'a str,
    pub hashed_password: &'a str,
}

impl<'a> NewUser<'a> {
    pub fn new(user_request: &'a CreateUserDTO, hashed_password: &'a str) -> Self {
        NewUser {
            firstname: &user_request.firstname,
            lastname: &user_request.lastname,
            username: &user_request.username,
            hashed_password,
        }
    }
}

/// Change password
pub struct ChangePassword {
    pub user_id: i32,
    pub old_password: String,
    pub new_password: String,
}

/// Delete Account
pub struct DeleteAccount {
    pub user_id: i32,
    pub password: String,
}

/// Update Account
pub struct UpdateAccount {
    pub user_id: i32,
    pub firstname: String,
    pub lastname: String,
    // pub email: String,
}

impl UpdateAccount {
    pub fn new(user_id: i32, update_account_dto: UpdateAccountDTO) -> Self {
        UpdateAccount {
            user_id,
            firstname: update_account_dto.firstname.to_owned(),
            lastname: update_account_dto.lastname.to_owned(),
            // email: update_account_dto.email.to_owned(),
        }
    }
}
