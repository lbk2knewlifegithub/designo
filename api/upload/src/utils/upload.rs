use std::io::Write;

use super::tmp_file::TmpFile;
use actix_multipart::Multipart;
use actix_web::web;
use prelude::{errors::upload_error::UploadError, Result};
use tokio_stream::StreamExt;

/// Save Avatar
pub async fn save_avatar(mut payload: Multipart, old_avatar: Option<String>) -> Result<String> {
    //   Field
    let mut field = match payload.try_next().await {
        Ok(Some(field)) => field,
        _ => return Err(UploadError::FileNotFound.into()),
    };
    // File Name. ex: avatar.png, avatar.jpg
    let filename = match field.content_disposition().get_filename() {
        Some(filename) => filename,
        None => return Err(UploadError::FileNameNotFound.into()),
    };

    let tmp_file = TmpFile::new(filename, old_avatar)?;
    let tmp_path = tmp_file.tmp_path.clone();

    // File::create is blocking operation, use threadpool
    let mut f = web::block(move || std::fs::File::create(tmp_path)).await??;

    // Field in turn is stream of *Bytes* object
    while let Some(chunk) = field.try_next().await? {
        // filesystem operations are blocking, we have to use threadpool
        f = web::block(move || f.write_all(&chunk).map(|_| f)).await??;
    }

    // Save from image from tmp folder to avatar folder and remove tmp file
    let tmp_file_clone = tmp_file.clone();
    web::block(move || tmp_file_clone.save_avatar_and_remove()).await??;

    Ok(tmp_file.clone().id)
}
