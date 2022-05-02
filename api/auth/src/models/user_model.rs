use chrono::NaiveDateTime;
use prelude::models::user_token::UserToken;
use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, Clone, Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "users")]
pub struct User {
    pub user_id: i32,

    pub name: String,
    pub username: String,
    pub email: Option<String>,
    pub avatar: String,

    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub admin: bool,
    pub blocked: bool,
}

impl From<User> for UserToken {
    fn from(user: User) -> Self {
        UserToken::new(user.user_id).admin(user.admin).build()
    }
}
