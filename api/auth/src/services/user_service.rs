// use crate::{models::user_model::User, repos::user_repo, AuthState};
// use prelude::{errors::AppError, Result};

// /// Get User by id
// pub async fn _get_user_by_id(state: &AuthState, user_id: &i32) -> Result<User> {
//     let client = &state.db.pool.get().await?;

//     match user_repo::get_user_by_id(client, user_id).await? {
//         Some(user) => Ok(user),
//         None => Err(AppError::RecordNotFound),
//     }
// }

// /// username exists Service
// pub async fn username_exists(state: &AuthState, username: &str) -> Result<()> {
//     let client = &state.db.pool.get().await?;

//     match user_repo::get_user_by_username(client, username).await? {
//         Some(_) => Ok(()),
//         None => Err(AppError::RecordNotFound),
//     }
// }

// /// email exists Service
// // pub async fn email_exists(state: &AuthState, email: &str) -> Result<()> {
// //     let client = &state.db.pool.get().await?;

// //     match user_repo::get_user_by_email(client, email).await? {
// //         Some(_) => Ok(()),
// //         None => Err(AppError::RecordNotFound),
// //     }
// // }

// /// Get User By Username
// pub async fn get_user_by_username(state: &AuthState, username: &str) -> Result<User> {
//     let client = &state.db.pool.get().await?;

//     match user_repo::get_user_by_username(client, username).await? {
//         Some(u) => Ok(u),
//         None => Err(AppError::RecordNotFound),
//     }
// }
