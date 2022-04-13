use crate::{
    dto::{
        auth_dto::{Credentials, Token},
        user_dto::CreateUserDTO,
    },
    models::user_model::{ChangePassword, DeleteAccount, NewUser, UpdateAccount, User},
    repos::user_repo,
    AuthState,
};
use actix_redis::Command;
use prelude::{
    errors::{auth_error::AuthError, AppError},
    models::user_token::UserToken,
    Result,
};

use redis_async::{resp::FromResp, resp_array};
use tracing::{debug, info};
use uuid::Uuid;

/// Login
pub async fn login(state: &AuthState, credentital: &Credentials) -> Result<Token> {
    let client = state.db.read.get().await?;

    // Check user exist
    let user = match user_repo::get_user_by_username(&client, &credentital.username).await? {
        Some(u) => u,
        None => return Err(AuthError::Unauthorize.into()),
    };

    // Hash password and compare with user in database
    state
        .hasher
        .verify(&user.password, &credentital.password)
        .await?;

    // Create access_token
    let user_token = UserToken::new(user.user_id).build();
    let access_token = state.jwt.hash(user_token).await;

    Ok(Token {
        access_token: Some(access_token),
    })
}

/// SignUp
pub async fn signup(state: &AuthState, create_user_dto: &CreateUserDTO) -> Result<Token> {
    let client = &state.db.read_write.get().await?;
    // Check User existed
    let user = user_repo::get_user_by_username(&client, &create_user_dto.username).await?;

    if let Some(_) = user {
        return Err(AppError::RecordAlreadyExists);
    }

    // Hash password
    let hashed_password = state.hasher.hash(&create_user_dto.password).await?;

    // Create new user
    let new_user = NewUser::new(&create_user_dto, &hashed_password);
    info!("Auth Service -> Sign Up  -> create_user ");
    let user = user_repo::create_user(&client, &new_user).await?;

    // Create access token
    let user_token = UserToken::new(user.user_id).build();
    info!("Auth Service -> Sign Up  -> user_token {:?}", user_token);

    let access_token = state.jwt.hash(user_token).await;
    info!(
        "Auth Service -> Sign Up  -> Create access_token {:?}",
        access_token
    );

    Ok(Token {
        access_token: Some(access_token),
    })
}

/// Me
pub async fn me(state: &AuthState, token: &Token) -> Result<User> {
    let client = &state.db.read.get().await?;

    // Decode Token
    let user_token = state
        .jwt
        .decode::<UserToken>(&token.access_token.to_owned().unwrap())
        .map_err(|e| {
            debug!("Decode token failed {}", e,);
            AuthError::Unauthorize
        })?;

    debug!("Auth Me -> {user_token:?}");

    // Check User existed
    let user = user_repo::get_user_by_id(&client, &user_token.user_id).await?;

    match user {
        Some(u) => Ok(u),
        None => {
            return {
                debug!("Auth Me -> User not found");
                Err(AppError::InvalidInput)
            }
        }
    }
}

/// Delete Account Service
pub async fn delete_account(state: &AuthState, da: DeleteAccount) -> Result<()> {
    let client = &state.db.read_write.get().await?;

    // Check User existed
    let user = match user_repo::get_user_by_id(&client, &da.user_id).await? {
        Some(u) => u,
        None => return Err(AppError::RecordNotFound.into()),
    };

    // Check password is Correct
    state.hasher.verify(&user.password, &da.password).await?;

    Ok(user_repo::delete_account(&client, &da.user_id).await?)
}

/// Update Account Service
pub async fn update_account(state: &AuthState, ua: &UpdateAccount) -> Result<()> {
    let client = &state.db.read_write.get().await?;
    Ok(user_repo::update_account(&client, ua).await?)
}

/// Change Password Service
pub async fn change_password(state: &AuthState, cp: &ChangePassword) -> Result<()> {
    let client = &state.db.read_write.get().await?;

    // Check User existed
    let user = match user_repo::get_user_by_id(&client, &cp.user_id).await? {
        Some(u) => u,
        None => return Err(AppError::RecordNotFound.into()),
    };

    // Check old password is correct
    state
        .hasher
        .verify(&user.password, &cp.old_password)
        .await?;

    // Hash new password and save to database
    let new_hashed_password = state.hasher.hash(&cp.new_password).await?;

    Ok(user_repo::change_password(&client, &cp.user_id, &new_hashed_password).await?)
}

/// Request Verify Email Service
pub async fn request_verify_email(state: &AuthState, user_id: &i32) -> Result<()> {
    let client = &state.db.read.get().await?;

    // Get User By Id
    let user = match user_repo::get_user_by_id(&client, user_id).await? {
        Some(u) => u,
        None => {
            debug!("AuthService -> request_verify_email -> Get User Id -> User not found");
            return Err(AppError::InvalidInput);
        }
    };

    let email = match user.email {
        Some(e) => e,
        None => {
            debug!("AuthService -> request_verify_email -> Email not found");
            return Err(AppError::InvalidInput);
        }
    };

    // Creawte Token
    let token = Uuid::new_v4().to_string();
    debug!("Auth Service -> request_verify_email -> token: {}", token);

    // Save token to redis
    state
        .redis
        .read_write
        .send(Command(resp_array![
            "SET",
            token.clone(),
            user.user_id.to_string(),
            "EX",
            "180"
        ]))
        .await??;
    debug!(
        "Send verify -> Set token/user_id {}/{} saved to redis",
        token, user.user_id
    );

    debug!(
        "Send verify -> Set token/user_id {}/{} saved to redis",
        token, user.user_id
    );

    if let Err(e) = state.email.send_verify(&email, &token).await {
        state
            .redis
            .read_write
            .send(Command(resp_array!["DEL", token.clone(),]))
            .await??;
        panic!("Send verify email failed {}", e);
    }
    debug!("Send Email Success");

    Ok(())
}

/// Verify Email Service
pub async fn verify_email(state: &AuthState, token: &str) -> Result<()> {
    let client = &state.db.read_write.get().await?;

    // Get token to redis
    let resp = state
        .redis
        .read
        .send(Command(resp_array!["GET", token]))
        .await
        .expect("Auth Service -> verify_email -> Get token -> Mailbox error")
        .expect("Auth Service -> verify_email -> Get token -> Redis error");

    debug!("{resp:?}");
    // Get user_id
    let user_id: i32 = match String::from_resp_int(resp) {
        Ok(u) => u.parse().expect(
            format!(
                "Auth Service -> verify_email -> Parse user_id failed -> {}",
                u
            )
            .as_str(),
        ),
        Err(e) => {
            debug!(
                "AuthService ->  verify_email -> Get user_id by token {} ->  {}",
                token, e
            );
            return Err(AppError::InvalidInput);
        }
    };

    // Delete old token
    state
        .redis
        .read_write
        .send(Command(resp_array!["DEL", token]))
        .await
        .expect("Auth Service -> verify_email -> Delete token -> Mailbox error")
        .expect("Auth Service -> verify_email -> Delete token -> Redis error");

    user_repo::verify_email(&client, &user_id).await?;

    Ok(())
}
