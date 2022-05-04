use derive_more::Display;
use prelude::errors::AppError;

#[derive(Debug, Display)]
pub enum CommentError {
    CommentNotFound,
    CommentInvalid,
}

impl From<CommentError> for AppError {
    fn from(e: CommentError) -> Self {
        let error = format!("{}", e);
        match e {
            CommentError::CommentInvalid => {
                AppError::bad_request(error, "comment not invalid".to_owned())
            }
            CommentError::CommentNotFound => {
                AppError::not_found(error, "comment not found".to_owned())
            }
        }
    }
}
