use super::{bio_model::Bio, user_links_model::UserLinks, user_token::UserToken};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserProfile {
    pub user_id: i32,
    pub name: String,
    pub username: String,

    pub email: String,

    pub avatar: String,

    #[serde(rename(serialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[serde(rename(serialize = "updatedAt"))]
    pub updated_at: NaiveDateTime,

    pub admin: bool,

    pub blocked: bool,

    #[serde(rename(serialize = "isPremium"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_premium: Option<bool>,

    #[serde(rename(serialize = "isHireMe"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_hire_me: Option<bool>,

    pub location: String,

    pub bio: Bio,

    pub links: UserLinks,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAuthentication {
    pub user_id: i32,

    pub name: String,

    pub username: String,

    pub email: String,

    pub avatar: String,

    pub admin: bool,

    #[serde(rename(serialize = "isPremium"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_premium: Option<bool>,

    #[serde(rename(serialize = "isHireMe"))]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_hire_me: Option<bool>,

    pub location: String,
}

impl From<UserProfile> for UserToken {
    fn from(user: UserProfile) -> Self {
        UserToken::new(user.user_id).admin(user.admin).build()
    }
}

impl From<UserAuthentication> for UserToken {
    fn from(user: UserAuthentication) -> Self {
        UserToken::new(user.user_id).admin(user.admin).build()
    }
}
