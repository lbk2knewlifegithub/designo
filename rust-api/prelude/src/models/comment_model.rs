use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Comment {
    pub comment_id: i32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_id: Option<i32>,
    pub content: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(rename(serialize = "replyingTo"))]
    pub replying_to: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub replies: Option<Replies>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub user: UserComment,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserComment {
    pub user_id: i32,
    pub firstname: String,
    pub lastname: String,
    pub username: String,
    pub avatar: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Replies(Vec<Comment>);
