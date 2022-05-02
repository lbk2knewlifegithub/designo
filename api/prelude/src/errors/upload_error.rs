use super::AppError;
use derive_more::Display;
use tracing::error;

#[derive(Debug, Display)]
pub enum UploadError {
    /**
     * - File Not Found
     */
    FileNotFound,

    /**
     * - File Name Not Found
     */
    FileNameNotFound,

    /**
     * - Extension Not Found
     */
    ExtensionNotFound,

    /**
     * - Multipart Error
     */
    MultipartError(actix_multipart::MultipartError),

    /**
     * - Invalid Extension
     */
    InvalidFileExtension,
}

impl From<UploadError> for AppError {
    fn from(e: UploadError) -> Self {
        let error = format!("{}", e);
        error!("Upload Error - {e}");
        match e {
            UploadError::FileNotFound => AppError::BadRequest(error, "file not found".to_owned()),
            UploadError::FileNameNotFound => {
                AppError::BadRequest(error, "file name not found".to_owned())
            }
            UploadError::ExtensionNotFound => {
                AppError::BadRequest(error, "extension not found".to_owned())
            }
            UploadError::MultipartError(_) => {
                AppError::BadRequest(error, "multipart error".to_owned())
            }
            UploadError::InvalidFileExtension => AppError::BadRequest(
                error,
                "invalid extension must be [png, jpeg, jpg]".to_owned(),
            ),
        }
    }
}
