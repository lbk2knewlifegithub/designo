use crate::dto::feedback_dto::CreateFeedbackDTO;
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "feedbacks")]
pub struct Feedback {
    pub feedback_id: i32,
    pub user_id: i32,
    pub title: String,
    pub category: String,
    pub upvotes: i32,
    pub upvoted: bool,
    pub status: String,
    pub description: String,
    #[serde(rename(serialize = "commentsLength"))]
    pub comments_length: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

/// New Feedback
pub struct NewFeedback {
    pub user_id: i32,
    pub category_id: i32,
    pub title: String,
    pub description: String,
}

impl NewFeedback {
    pub fn new(create_feedback_dto: &CreateFeedbackDTO, user_id: &i32, category_id: &i32) -> Self {
        NewFeedback {
            user_id: user_id.to_owned(),
            category_id: category_id.to_owned(),
            title: create_feedback_dto.title.to_owned(),
            description: create_feedback_dto.description.to_owned(),
        }
    }
}

pub struct UpdateFeedback {
    pub feedback_id: i32,
    pub user_id: i32,
    pub category_id: i32,
    pub status_id: i32,
    pub title: String,
    pub description: String,
}

pub struct Upvote {
    pub feedback_id: i32,
    pub user_id: i32,
}

impl Upvote {
    pub fn new(feedback_id: &i32, user_id: &i32) -> Self {
        Upvote {
            feedback_id: feedback_id.to_owned(),
            user_id: user_id.to_owned(),
        }
    }
}

pub struct Downvote {
    pub feedback_id: i32,
    pub user_id: i32,
}

impl Downvote {
    pub fn new(feedback_id: &i32, user_id: &i32) -> Self {
        Downvote {
            feedback_id: feedback_id.to_owned(),
            user_id: user_id.to_owned(),
        }
    }
}

pub struct DeleteFeedback {
    pub feedback_id: i32,
    pub user_id: i32,
}

impl DeleteFeedback {
    pub fn new(feedback_id: &i32, user_id: &i32) -> Self {
        DeleteFeedback {
            feedback_id: feedback_id.to_owned(),
            user_id: user_id.to_owned(),
        }
    }
}
