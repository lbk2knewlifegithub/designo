use derive_more::Display;
use prelude::errors::AppError;
use tracing::error;

#[derive(Debug, Display)]
pub enum UploadError {
    /// File Not Found
    FileNotFound,

    /// File Name Not Found
    FileNameNotFound,

    /// Extension Not Found
    ExtensionNotFound,

    /// Multipart Error
    MultipartError(actix_multipart::MultipartError),

    /// Invalid Extension
    InvalidFileExtension,
}

impl From<UploadError> for AppError {
    fn from(e: UploadError) -> Self {
        let error = format!("{}", e);
        error!("Upload Error - {e}");
        match e {
            UploadError::FileNotFound => AppError::bad_request(error, "file not found".to_owned()),
            UploadError::FileNameNotFound => {
                AppError::bad_request(error, "file name not found".to_owned())
            }
            UploadError::ExtensionNotFound => {
                AppError::bad_request(error, "extension not found".to_owned())
            }
            UploadError::MultipartError(_) => {
                AppError::bad_request(error, "multipart error".to_owned())
            }
            UploadError::InvalidFileExtension => AppError::bad_request(
                error,
                "invalid extension must be [png, jpeg, jpg]".to_owned(),
            ),
        }
    }
}
