use super::AppError;
use derive_more::Display;
use tracing::debug;

#[derive(Debug, Display)]
pub enum GithubError {
    CodeNotFound,
    GetUserFailure(reqwest::Error),
}

impl From<GithubError> for AppError {
    fn from(e: GithubError) -> Self {
        let error = format!("{}", e);
        match e {
            GithubError::CodeNotFound => AppError::bad_request(error, "Code not found".to_owned()),
            GithubError::GetUserFailure(e) => {
                debug!("Reqwest Error - {e}");
                AppError::bad_request(error, "Get user Github Failure".to_owned())
            }
        }
    }
}
