use derive_more::Display;

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
