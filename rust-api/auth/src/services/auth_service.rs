use crate::{repos::user_repo, AuthState};
use prelude::{
    errors::{auth_error::AuthError, AppError},
    models::{user_model::UserAuthentication, user_token::UserToken},
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
    let user = user_repo::get_full_user_by_username(&trans, &user_github.login).await?;

    if let Some(u) = user {
        return Ok(state.jwt.hash(u.into()).await);
    }

    // Create user
    let user_id = user_repo::create_user(&trans, &user_github).await?;

    trans.commit().await?;

    // Create token and send back to client
    let user_token = UserToken::new(user_id).build();
    Ok(state.jwt.hash(user_token).await)
}

/// Me
pub async fn me(state: &AuthState, token: &str) -> Result<UserAuthentication> {
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
    let user = user_repo::get_user_auth_by_id(&trans, &user_id).await?;

    match user {
        Some(u) => Ok(u),
        None => {
            debug!("Auth Me -> User not found");
            Err(AppError::not_found(
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
