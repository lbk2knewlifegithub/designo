use prelude::{errors::AppError, Result};

use deadpool_postgres::Client;
use tracing::debug;

/// Get Avatar
pub async fn get_avatar(client: &Client, user_id: &i32) -> Result<Option<String>> {
    let stmt = client
        .prepare(&r#"SELECT avatar FROM users WHERE user_id = $1;"#)
        .await?;

    Ok(client
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| row.get("avatar"))
        .collect::<Vec<Option<String>>>()
        .pop()
        .ok_or(AppError::RecordNotFound)?)
}

/// Upload Avatar Repo
pub async fn upload_avatar(client: &Client, user_id: &i32, avatar: &str) -> Result<i32> {
    let stmt = client
        .prepare(&r#"UPDATE users SET avatar = $1 WHERE user_id = $2;"#)
        .await?;
    let affected = client
        .execute(&stmt, &[&avatar, &user_id])
        .await
        .map_err(|e| {
            debug!("Upload Avatar: {e}");
            AppError::InvalidInput
        })?;
    Ok(affected as i32)
}
