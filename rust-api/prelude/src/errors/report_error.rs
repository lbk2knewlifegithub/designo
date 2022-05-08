use super::AppError;
use derive_more::Display;

#[derive(Debug, Display)]
pub enum ReportError {
    ReportNotFound,
    InvalidReport,
}

impl From<ReportError> for AppError {
    fn from(re: ReportError) -> Self {
        let error = format!("{}", re);
        match re {
            ReportError::ReportNotFound => {
                AppError::bad_request(error, "report not found".to_owned())
            }

            ReportError::InvalidReport => AppError::bad_request(error, "report invalid".to_owned()),
        }
    }
}
