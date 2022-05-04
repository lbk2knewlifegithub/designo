use derive_more::Display;
use prelude::errors::AppError;

#[derive(Debug, Display)]
pub enum FeedbackError {
    FeedbackNotFound,
    FeedbackInvalid,
    AlreadyUpvote,
}

impl From<FeedbackError> for AppError {
    fn from(e: FeedbackError) -> Self {
        let error = format!("{}", e);
        match e {
            FeedbackError::FeedbackInvalid => {
                AppError::bad_request(error, "Feedback not invalid".to_owned())
            }
            FeedbackError::FeedbackNotFound => {
                AppError::not_found(error, "Feedback not found".to_owned())
            }
            FeedbackError::AlreadyUpvote => {
                AppError::bad_request(error, "Feedback already upvote".to_owned())
            }
        }
    }
}
