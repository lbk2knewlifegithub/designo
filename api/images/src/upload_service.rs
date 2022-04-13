use crate::{upload_repo, utils, ImagesState};
use actix_multipart::Multipart;
use prelude::{errors::AppError, Result};

/// Upload Avatar Service
pub async fn upload_avatar(
    state: &ImagesState,
    user_id: &i32,
    payload: Multipart,
) -> Result<String> {
    let client = state.db.write.get().await?;

    // Get old_avatar if exists
    let old_avatar = upload_repo::get_avatar(&client, user_id).await?;

    // Save Avatar to FileSystem
    let avatar = utils::upload::save_avatar(payload, old_avatar).await?;

    // Update avatar to database
    let affected = upload_repo::upload_avatar(&client, user_id, &avatar).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(avatar)
}
