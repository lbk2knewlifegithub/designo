use crate::{models::user_model::User, repos::user_repo, AuthState};
use prelude::{
    errors::{auth_error::AuthError, AppError},
    Result,
};
use tracing::debug;

/// Login Github
pub async fn login_github(state: &AuthState, code: &str) -> Result<String> {
    let user_github = state.github.get_user(code).await?;
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    // Check user exists
    let user = user_repo::get_user_by_username(&trans, &user_github.login).await?;

    if let Some(u) = user {
        return Ok(state.jwt.hash(u.into()).await);
    }

    let user = user_repo::create_user(&trans, &user_github).await?;

    trans.commit().await?;

    // Create token and send back to client
    Ok(state.jwt.hash(user.into()).await)
}

/// Me
pub async fn me(state: &AuthState, token: &str) -> Result<User> {
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    // Decode Token
    let user_id = state
        .jwt
        .decode(&token.to_owned())
        .await
        .map_err(|e| {
            debug!("Decode token failed {}", e,);
            AuthError::TokenInvalid
        })?
        .user_id;

    // Check User existed
    let user = user_repo::get_user_by_id(&trans, &user_id).await?;

    match user {
        Some(u) => Ok(u),
        None => {
            debug!("Auth Me -> User not found");
            Err(AppError::NotFound(
                "UserNotFound".to_owned(),
                "user not found".to_owned(),
            ))
        }
    }
}

// /// Update Account Service
// pub async fn update_account(state: &AuthState, ua: &UpdateAccount) -> Result<()> {
//     let client = &state.db.pool.get().await?;
//     Ok(user_repo::update_account(&client, ua).await?)
// }
