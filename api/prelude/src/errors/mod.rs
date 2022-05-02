use actix::MailboxError;
use actix_web::{error::BlockingError, http::StatusCode, HttpResponse, HttpResponseBuilder};
use deadpool_postgres::PoolError;
use std::fmt;
use tokio_pg_mapper::Error as PGMapperError;
use tokio_postgres::error::Error as PGError;
use tracing::debug;
use validator::ValidationError;

pub mod auth_error;
pub mod ddos_error;
pub mod feedback_error;
pub mod github_error;
pub mod invoice_error;
pub mod upload_error;

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
    pub fn IntervalServerError() -> Self {
        Self {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error: "InternalServerError".to_owned(),
            message: "Something went wrong".to_owned(),
        }
    }

    pub fn BadRequest(error: String, message: String) -> Self {
        Self {
            code: StatusCode::BAD_REQUEST,
            error,
            message,
        }
    }

    pub fn Unauthorize(error: String, message: String) -> Self {
        Self {
            code: StatusCode::UNAUTHORIZED,
            error,
            message,
        }
    }
    pub fn Forbidden(error: String, message: String) -> Self {
        Self {
            code: StatusCode::FORBIDDEN,
            error,
            message,
        }
    }
    pub fn NotFound(error: String, message: String) -> Self {
        Self {
            code: StatusCode::NOT_FOUND,
            error,
            message,
        }
    }
    pub fn TooManyRequest(error: String, message: String) -> Self {
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
        debug!("BlockingError {e}");
        AppError::IntervalServerError()
    }
}

impl From<MailboxError> for AppError {
    fn from(e: MailboxError) -> Self {
        debug!("MailboxError {e}");
        AppError::IntervalServerError()
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        debug!("{e}");
        AppError::IntervalServerError()
    }
}

impl From<PGMapperError> for AppError {
    fn from(e: PGMapperError) -> Self {
        debug!("PGMapperError {e}");
        AppError::IntervalServerError()
    }
}

impl From<PGError> for AppError {
    fn from(e: PGError) -> Self {
        debug!("PGError {e}");
        AppError::IntervalServerError()
    }
}

impl From<PoolError> for AppError {
    fn from(e: PoolError) -> Self {
        debug!("PoolError {e}");
        AppError::IntervalServerError()
    }
}

impl From<actix_redis::Error> for AppError {
    fn from(e: actix_redis::Error) -> Self {
        debug!("Redis Error - {e}");
        AppError::IntervalServerError()
    }
}

impl From<ValidationError> for AppError {
    fn from(e: ValidationError) -> Self {
        debug!("ValidationError - {e}");
        AppError::BadRequest(
            "ValidationErrore".to_owned(),
            e.message.unwrap_or_default().to_string(),
        )
    }
}
