use chrono::NaiveDateTime;
use postgres_types::FromSql;
use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use tracing::error;

use crate::dto::comment_dto::AddCommentDTO;

#[derive(Debug, Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "comments")]
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

impl<'a> FromSql<'a> for UserComment {
    fn from_sql(
        _ty: &postgres_types::Type,
        raw: &'a [u8],
    ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
        let s = match std::str::from_utf8(raw) {
            Ok(v) => v,
            Err(e) => {
                error!("Comment-UserComment: Invalid UTF-8 sequence: {}", e);
                return Err(Box::new(e));
            }
        };

        let user = match serde_json::from_str(&s) {
            Ok(v) => v,
            Err(e) => {
                error!("Comment-UserComment: Invalid JSON: {}", e);
                return Err(Box::new(e));
            }
        };

        Ok(user)
    }

    fn accepts(ty: &postgres_types::Type) -> bool {
        if ty == &postgres_types::Type::JSON {
            return true;
        }
        false
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Replies(Vec<Comment>);

impl<'a> FromSql<'a> for Replies {
    fn from_sql(
        _ty: &postgres_types::Type,
        raw: &'a [u8],
    ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
        let s = match std::str::from_utf8(raw) {
            Ok(v) => v,
            Err(e) => {
                error!("Comment-Replies: Invalid UTF-8 sequence: {}", e);
                return Err(Box::new(e));
            }
        };

        let replies = match serde_json::from_str(&s) {
            Ok(v) => v,
            Err(e) => {
                error!("Comment-Replies: Invalid JSON: {}", e);
                return Err(Box::new(e));
            }
        };

        Ok(Replies(replies))
    }

    fn accepts(ty: &postgres_types::Type) -> bool {
        if ty == &postgres_types::Type::JSON {
            return true;
        }
        false
    }
}

/// New Comments
pub struct NewComment {
    pub feedback_id: i32,
    pub content: String,
    pub user_id: i32,
    pub replying_to: Option<String>,
    pub parent_id: Option<i32>,
}

impl NewComment {
    pub fn new(feedback_id: &i32, user_id: &i32, add_comment_dto: &AddCommentDTO) -> Self {
        let AddCommentDTO {
            content,
            replying_to,
            parent_id,
        } = add_comment_dto;

        NewComment {
            feedback_id: feedback_id.to_owned(),
            user_id: user_id.to_owned(),
            content: content.to_owned(),
            replying_to: replying_to.to_owned(),
            parent_id: parent_id.to_owned(),
        }
    }
}

/// Update Comment
pub struct UpdateComment {
    pub comment_id: i32,
    pub user_id: i32,
    pub content: String,
}

impl UpdateComment {
    pub fn new(comment_id: &i32, user_id: &i32, content: &str) -> Self {
        UpdateComment {
            comment_id: comment_id.to_owned(),
            user_id: user_id.to_owned(),
            content: content.to_owned(),
        }
    }
}
