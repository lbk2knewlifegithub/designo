use super::AppError;
use derive_more::Display;

#[derive(Debug, Display)]
pub enum DDosError {
    TooManyRequest,
}

impl From<DDosError> for AppError {
    fn from(e: DDosError) -> Self {
        let error = format!("{}", e);
        match e {
            DDosError::TooManyRequest => {
                AppError::TooManyRequest(error, "too many request".to_owned())
            }
        }
    }
}
