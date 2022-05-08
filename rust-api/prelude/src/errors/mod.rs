use actix::MailboxError;
use actix_web::{error::BlockingError, http::StatusCode, HttpResponse, HttpResponseBuilder};
use std::error::Error as StdError;
use std::fmt;
use tracing::debug;
use validator::ValidationError;

pub mod auth_error;
pub mod ddos_error;
pub mod github_error;
pub mod report_error;

#[derive(Debug)]
pub struct AppError {
    code: StatusCode,
    error: String,
    message: String,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.error)
    }
}

impl AppError {
    pub fn internal_server_error(error: Box<dyn StdError>) -> Self {
        debug!("internal_server_error {error}");
        Self {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error: "InternalServerError".to_owned(),
            message: "Something went wrong".to_owned(),
        }
    }

    pub fn bad_request(error: String, message: String) -> Self {
        Self {
            code: StatusCode::BAD_REQUEST,
            error,
            message,
        }
    }

    pub fn unauthorize(error: String, message: String) -> Self {
        Self {
            code: StatusCode::UNAUTHORIZED,
            error,
            message,
        }
    }
    pub fn forbidden(error: String, message: String) -> Self {
        Self {
            code: StatusCode::FORBIDDEN,
            error,
            message,
        }
    }
    pub fn not_found(error: String, message: String) -> Self {
        Self {
            code: StatusCode::NOT_FOUND,
            error,
            message,
        }
    }
    pub fn too_many_request(error: String, message: String) -> Self {
        Self {
            code: StatusCode::TOO_MANY_REQUESTS,
            error,
            message,
        }
    }
}

#[derive(Debug, serde_derive::Serialize)]
struct ErrorResponse {
    error: String,
    message: String,
}

impl From<&AppError> for ErrorResponse {
    fn from(app_error: &AppError) -> Self {
        Self {
            error: app_error.error.to_owned(),
            message: app_error.message.to_owned(),
        }
    }
}

impl actix_web::ResponseError for AppError {
    fn error_response(&self) -> HttpResponse {
        HttpResponseBuilder::new(self.code).json(ErrorResponse::from(self))
    }
}

impl From<BlockingError> for AppError {
    fn from(e: BlockingError) -> Self {
        AppError::internal_server_error(e.into())
    }
}

impl From<MailboxError> for AppError {
    fn from(e: MailboxError) -> Self {
        AppError::internal_server_error(e.into())
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError::internal_server_error(e.into())
    }
}

impl From<actix_redis::Error> for AppError {
    fn from(e: actix_redis::Error) -> Self {
        AppError::internal_server_error(e.into())
    }
}

impl From<ValidationError> for AppError {
    fn from(e: ValidationError) -> Self {
        debug!("ValidationError - {e}");
        AppError::bad_request(
            "ValidationError".to_owned(),
            e.message.unwrap_or_default().to_string(),
        )
    }
}
