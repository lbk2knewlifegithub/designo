use super::AppError;
use derive_more::Display;

#[derive(Debug, Display)]
pub enum FeedbackError {
    AlreadyUpvote,
}

impl From<FeedbackError> for AppError {
    fn from(e: FeedbackError) -> Self {
        let error = format!("{}", e);
        match e {
            FeedbackError::AlreadyUpvote => {
                AppError::BadRequest(error, "Feedback already upvote".to_owned())
            }
        }
    }
}
