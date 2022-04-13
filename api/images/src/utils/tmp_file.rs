use image::imageops::FilterType;
use prelude::errors::{upload_error::UploadError, AppError};
use prelude::Result;
use tracing::{debug, error};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct TmpFile {
    pub id: String,
    pub tmp_path: String,
    old_avatar: Option<String>,
}

impl TmpFile {
    pub fn new(filename: &str, old_avatar: Option<String>) -> Result<TmpFile> {
        // Validate file extension
        TmpFile::validate_extension(filename)?;
        // Random name

        let id = Uuid::new_v4().to_string();

        Ok(TmpFile {
            id: id.clone(),
            old_avatar,
            tmp_path: format!("/tmp/{}{}", id, filename),
        })
    }

    // Validate file extension
    fn validate_extension(filename: &str) -> Result<()> {
        // Check have extension
        let extension = match TmpFile::split_extension(filename) {
            Some(extension) => extension,
            None => return Err(UploadError::ExtensionNotFound.into()),
        };

        // Validation Extension
        if [".png", ".jpg", ".jpeg", ".svg"]
            .iter()
            .all(|x| x != &extension)
        {
            return Err(UploadError::InvalidFileExtension.into());
        }

        Ok(())
    }

    fn static_image(id: &str) -> String {
        format!("./static/{}.jpeg", id)
    }

    /// Save as Avatar and and remove tmp file
    pub fn save_avatar_and_remove(&self) -> Result<()> {
        let new_path = TmpFile::static_image(&self.id);
        debug!("new_path: {}", new_path);
        let img = image::open(self.tmp_path.clone()).unwrap();

        // Resize image
        let resized = image::imageops::resize(&img, 300, 300, FilterType::Gaussian);

        resized.save(new_path).unwrap();

        // Remove tmp image
        if let Err(e) = std::fs::remove_file(self.tmp_path.clone()) {
            error!("Not found tmp_file to remove {}", e);
            return Err(AppError::IntervalServerError);
        }

        // Remove old_avatar if exist
        if let Some(id) = &self.old_avatar {
            if let Err(e) = std::fs::remove_file(TmpFile::static_image(id)) {
                error!("Not found old_avatar to remove {}", e);
                return Err(AppError::IntervalServerError);
            }
        }

        Ok(())
    }

    /// Split extension
    fn split_extension(filename: &str) -> Option<&str> {
        let dot_index = filename.rfind(".")?;

        let extension = &filename[dot_index..];
        if extension.len() == 1 {
            return None;
        }

        Some(extension)
    }
}

#[cfg(test)]
mod test_tmp_file {
    use super::*;

    #[test]
    fn test_extension() {
        assert_eq!(TmpFile::split_extension("test.png"), Some(".png"));
        assert_eq!(TmpFile::split_extension("test.png"), Some(".png"));
        assert_eq!(TmpFile::split_extension("test.png."), None);
        assert_eq!(TmpFile::split_extension("test"), None);
    }

    #[test]
    #[should_panic(expected = "ExtensionNotFound")]
    fn should_throw_extension_not_found() {
        TmpFile::new("test", None).unwrap();
    }

    #[test]
    #[should_panic(expected = "InvalidFileExtension")]
    fn should_panic_invalid_file_extension() {
        TmpFile::new("test.pdf", None).unwrap();
    }
}
