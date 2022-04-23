use actix_web::{error::BlockingError, HttpResponse};
use deadpool_postgres::{ConfigError, PoolError};
use derive_more::Display;
use lettre::transport::smtp::Error as EmailError;
use serde::Serialize;
use tokio_pg_mapper::Error as PGMapperError;
use tokio_postgres::error::Error as PGError;
use tracing::error;
use validator::ValidationError;

pub mod auth_error;
pub mod feedback_error;
pub mod invoice_error;
pub mod upload_error;

use auth_error::AuthError;
use feedback_error::FeedbackError;
use invoice_error::InvoiceError;
use upload_error::UploadError;

#[derive(Debug, Display)]
pub enum AppError {
    ValidationError(ValidationError),

    /// Invoice Error
    InvoiceError(InvoiceError),
    /// DDos Error
    DDosError,

    /**
     * - Record Already Exists
     */
    RecordAlreadyExists,

    /**
     * - Invoice Input
     */
    InvalidInput,

    /**
     * - Record Not Found
     */
    RecordNotFound,

    /**
     * Port Already Use
     */
    PortAlreadyUse,

    /**
     * - Upload Error
     */
    UploadError(UploadError),

    /**
     * - Config Error
     */
    ConfigError(ConfigError),

    /**
     * - AuthError
     */
    AuthError(AuthError),

    /**
     * - Feedback Error
     */
    FeedbackError(FeedbackError),

    // Interval Server Error
    IntervalServerError,
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

impl actix_web::ResponseError for AppError {
    fn error_response(&self) -> HttpResponse {
        let error = format!("{}", self);
        let mut builder = match self {
            AppError::RecordAlreadyExists => HttpResponse::Conflict(),
            AppError::RecordNotFound => HttpResponse::NotFound(),
            AppError::InvalidInput | AppError::UploadError(_) => HttpResponse::BadRequest(),
            AppError::PortAlreadyUse | AppError::IntervalServerError | AppError::ConfigError(_) => {
                HttpResponse::InternalServerError()
            }
            // Auth errors
            AppError::AuthError(e) => match e {
                AuthError::Unauthorize => HttpResponse::Unauthorized(),
                AuthError::InvalidCredentials => HttpResponse::BadRequest(),
            },
            AppError::FeedbackError(e) => match e {
                FeedbackError::AlreadyUpvote => HttpResponse::Conflict(),
            },
            AppError::DDosError => HttpResponse::TooManyRequests(),
            AppError::InvoiceError(_) => HttpResponse::BadRequest(),
            AppError::ValidationError(_) => HttpResponse::BadRequest(),
        };

        builder.json(ErrorResponse { error })
    }
}

impl From<AuthError> for AppError {
    fn from(e: AuthError) -> Self {
        error!("{e}");
        AppError::AuthError(e)
    }
}

impl From<actix_multipart::MultipartError> for AppError {
    fn from(e: actix_multipart::MultipartError) -> Self {
        error!("{e}");
        AppError::UploadError(UploadError::MultipartError(e))
    }
}

impl From<BlockingError> for AppError {
    fn from(e: BlockingError) -> Self {
        error!("{e}");
        AppError::IntervalServerError
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        error!("{e}");
        AppError::IntervalServerError
    }
}

impl From<PGMapperError> for AppError {
    fn from(e: PGMapperError) -> Self {
        error!("PGMapperError {e}");
        AppError::IntervalServerError
    }
}

impl From<PGError> for AppError {
    fn from(e: PGError) -> Self {
        error!("PGError {e}");
        AppError::IntervalServerError
    }
}

impl From<PoolError> for AppError {
    fn from(e: PoolError) -> Self {
        error!("PoolError {e}");
        AppError::IntervalServerError
    }
}

impl From<FeedbackError> for AppError {
    fn from(e: FeedbackError) -> Self {
        error!("{e}");
        AppError::FeedbackError(e)
    }
}

impl From<jsonwebtoken::errors::Error> for AppError {
    fn from(e: jsonwebtoken::errors::Error) -> Self {
        error!("{e}");
        match e.kind() {
            jsonwebtoken::errors::ErrorKind::InvalidToken
            | jsonwebtoken::errors::ErrorKind::InvalidSignature => AuthError::Unauthorize.into(),
            // jsonwebtoken::errors::ErrorKind::InvalidEcdsaKey => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidRsaKey(_) => todo!(),
            // jsonwebtoken::errors::ErrorKind::RsaFailedSigning => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidAlgorithmName => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidKeyFormat => todo!(),
            // jsonwebtoken::errors::ErrorKind::MissingRequiredClaim(_) => todo!(),
            // jsonwebtoken::errors::ErrorKind::ExpiredSignature => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidIssuer => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidAudience => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidSubject => todo!(),
            // jsonwebtoken::errors::ErrorKind::ImmatureSignature => todo!(),
            // jsonwebtoken::errors::ErrorKind::InvalidAlgorithm => todo!(),
            // jsonwebtoken::errors::ErrorKind::MissingAlgorithm => todo!(),
            // jsonwebtoken::errors::ErrorKind::Base64(_) => todo!(),
            // jsonwebtoken::errors::ErrorKind::Json(_) => todo!(),
            // jsonwebtoken::errors::ErrorKind::Utf8(_) => todo!(),
            // jsonwebtoken::errors::ErrorKind::Crypto(_) => todo!(),
            _ => AppError::IntervalServerError,
        }
    }
}

impl From<EmailError> for AppError {
    fn from(e: EmailError) -> Self {
        error!("Email Error: {e}");
        AppError::IntervalServerError
    }
}

impl From<UploadError> for AppError {
    fn from(e: UploadError) -> Self {
        error!("Upload Error - {e}");
        AppError::UploadError(e)
    }
}

impl From<actix_redis::Error> for AppError {
    fn from(e: actix_redis::Error) -> Self {
        error!("Redis Error - {e}");
        AppError::IntervalServerError
    }
}

impl From<actix::MailboxError> for AppError {
    fn from(e: actix::MailboxError) -> Self {
        error!("Actix Mailbox Error - {e}");
        AppError::IntervalServerError
    }
}

impl From<handlebars::RenderError> for AppError {
    fn from(e: handlebars::RenderError) -> Self {
        error!("Handler Error - {e}");
        AppError::IntervalServerError
    }
}

impl From<argon2::password_hash::Error> for AppError {
    fn from(e: argon2::password_hash::Error) -> Self {
        error!("Argon2 Error - {e}");

        // match e {
        //     argon2::password_hash::Error::Algorithm => todo!(),
        //     argon2::password_hash::Error::B64Encoding(_) => todo!(),
        //     argon2::password_hash::Error::Crypto => todo!(),
        //     argon2::password_hash::Error::OutputTooShort => todo!(),
        //     argon2::password_hash::Error::OutputTooLong => todo!(),
        //     argon2::password_hash::Error::ParamNameDuplicated => todo!(),
        //     argon2::password_hash::Error::ParamNameInvalid => todo!(),
        //     argon2::password_hash::Error::ParamValueInvalid(_) => todo!(),
        //     argon2::password_hash::Error::ParamsMaxExceeded => todo!(),
        //     argon2::password_hash::Error::Password => AuthError::Unauthorize.into(),
        //     argon2::password_hash::Error::PhcStringInvalid => todo!(),
        //     argon2::password_hash::Error::PhcStringTooShort => todo!(),
        //     argon2::password_hash::Error::PhcStringTooLong => todo!(),
        //     argon2::password_hash::Error::SaltInvalid(_) => todo!(),
        //     argon2::password_hash::Error::Version => todo!(),
        //     _ => todo!(),
        // }

        AuthError::Unauthorize.into()
    }
}

impl From<InvoiceError> for AppError {
    fn from(e: InvoiceError) -> Self {
        error!("InvoiceError - {e}");
        AppError::InvoiceError(e)
    }
}

impl From<ValidationError> for AppError {
    fn from(e: ValidationError) -> Self {
        error!("ValidationError - {e}");
        AppError::ValidationError(e)
    }
}
