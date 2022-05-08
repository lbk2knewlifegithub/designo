use crate::models::github_model::UserGithub;
use deadpool_postgres::Transaction;
use prelude::{errors::AppError, models::user_model::UserAuthentication, Result};

use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::error;

/// Get User By user_id Repo
pub async fn get_user_auth_by_id(
    trans: &Transaction<'_>,
    user_id: &i32,
) -> Result<Option<UserAuthentication>> {
    let stmt = trans
        .prepare(
            &r#"
        SELECT 
            u.user_id, 
            u.name, 
            u.username, 
            u.email, 
            u.avatar,
            u.admin,
            u.is_premium, 
            u.is_hire_me, 
            u.location
        FROM public.users u WHERE u.user_id = $1;
        "#,
        )
        .await
        .expect("Auth Repo -> get_user_by_id -> Error preparing statement");

    match trans.query_one(&stmt, &[&user_id]).await {
        Ok(row) => Ok(Some(UserAuthentication::from_row(row).unwrap())),
        Err(e) => Err(AppError::internal_server_error(e.into())),
    }
}

/// Get User By username Repo
pub async fn get_full_user_by_username(
    trans: &Transaction<'_>,
    username: &str,
) -> Result<Option<UserAuthentication>> {
    let stmt = trans
        .prepare(
            &r#"
        SELECT 
            u.user_id, 
            u.name, 
            u.username, 
            u.email, 
            u.avatar,
            u.created_at,  
            u.updated_at,  
            u.admin,
            u.blocked, 
            u.is_premium, 
            u.is_hire_me, 
            u.location
        FROM public.users u WHERE u.username = $1;"#,
        )
        .await?;

    match trans.query_one(&stmt, &[&username]).await {
        Ok(row) => Ok(Some(UserAuthentication::from_row_ref(&row).expect(
            "GET_USER_BY_USERNAME REPO Error When converting row to User",
        ))),
        Err(e) => {
            error!("GET_USER_BY_USERNAME REPO  {e}");
            Ok(None)
        }
    }
}

/// Create New user Repo
pub async fn create_user(trans: &Transaction<'_>, user_github: &UserGithub) -> Result<i32> {
    let stmt = trans
        .prepare(
            &r#"INSERT INTO public.users (name, username, email, avatar) VALUES($1, $2, $3, $4) RETURNING user_id;"#,
        )
        .await?;

    let UserGithub {
        name,
        login,
        avatar_url,
        email,
    } = user_github;

    match trans
        .query_one(
            &stmt,
            &[
                &name.to_owned().unwrap_or(login.to_owned()),
                &login,
                &email,
                &avatar_url,
            ],
        )
        .await
    {
        Ok(row) => Ok(row.get(0)),
        Err(e) => Err(AppError::internal_server_error(e.into())),
    }
}

// /// Update Account Repo
// pub async fn update_account(client: &Client, update_account: &UpdateAccount) -> Result<()> {
//     // let stmt = client
//     //     .prepare(
//     //         &r#"
//     //         UPDATE users u
//     //         SET
//     //             firstname = $1,
//     //             lastname = $2,
//     //             email = $3,
//     //             verified = CASE
//     //                     WHEN u.email IS NOT NULL AND u.email = $4 AND  u.verified IS NOT NULL
//     //                     THEN true
//     //                     ELSE false END
//     //         WHERE user_id = $5;
//     //         "#,
//     //     )
//     //     .await
//     //     .expect("Auth -> update_account -> Error preparing statement");

//     let stmt = client
//         .prepare(
//             &r#"
//             UPDATE users u
//             SET
//                 firstname = $1,
//                 lastname = $2
//             WHERE user_id = $3;
//             "#,
//         )
//         .await
//         .expect("Auth -> update_account -> Error preparing statement");

//     let affected = client
//         .execute(
//             &stmt,
//             &[
//                 &update_account.firstname,
//                 &update_account.lastname,
//                 // &update_account.email,
//                 // &update_account.email,
//                 &update_account.user_id,
//             ],
//         )
//         .await
//         .map_err(|e| {
//             debug!("Auth -> update_account -> Failed to execute query: {}", e);
//             AppError::InvalidInput
//         })?;

//     if affected == 1 {
//         return Ok(());
//     }

//     Err(AppError::RecordNotFound)
// }

// /// Delete Account Repo
// pub async fn delete_account(client: &Client, user_id: &i32) -> Result<()> {
//     let stmt = client
//         .prepare(&r#"DELETE FROM users WHERE user_id = $1"#)
//         .await
//         .expect("Auth -> delete_account -> Error preparing statement");

//     let affected = client.execute(&stmt, &[user_id]).await.map_err(|e| {
//         debug!(
//             "Auth Repo -> delete_account -> Failed to execute query: {}",
//             e
//         );
//         AppError::InvalidInput
//     })?;

//     if affected == 1 {
//         return Ok(());
//     }

//     Err(AppError::RecordNotFound)
// }

// /// Change Password Repo
// pub async fn change_password(client: &Client, user_id: &i32, new_password: &str) -> Result<()> {
//     let stmt = client
//         .prepare(&r#"UPDATE users SET password = $1 WHERE user_id= $2"#)
//         .await
//         .expect("Auth -> change_password -> Error preparing statement");

//     let affected = client
//         .execute(&stmt, &[&new_password, user_id])
//         .await
//         .map_err(|e| {
//             debug!(
//                 "Auth Repo -> change_password -> Failed to execute query: {}",
//                 e
//             );
//             AppError::InvalidInput
//         })?;

//     if affected == 1 {
//         return Ok(());
//     }

//     Err(AppError::RecordNotFound)
// }

// // /// Verify Email
// // pub async fn verify_email(client: &Client, user_id: &i32) -> Result<()> {
// //     let stmt = client
// //         .prepare(&r#"UPDATE users SET verified = true WHERE user_id= $1"#)
// //         .await
// //         .expect("Auth -> verify_email -> Error preparing statement");

// //     let affected = client.execute(&stmt, &[user_id]).await.map_err(|e| {
// //         debug!(
// //             "Auth Repo -> verify_email -> Failed to execute query: {}",
// //             e
// //         );
// //         AppError::InvalidInput
// //     })?;

// //     if affected == 1 {
// //         return Ok(());
// //     }

// //     Err(AppError::RecordNotFound)
// // }

// // /// Get User By email Repo
// // pub async fn get_user_by_email(client: &Client, email: &str) -> Result<Option<User>> {
// //     let stmt = client
// //         .prepare(&r#"SELECT * FROM users WHERE email = $1;"#)
// //         .await
// //         .expect("Auth Repo-> get_user_by_email -> Error preparing statement");

// //     Ok(client
// //         .query(&stmt, &[&email])
// //         .await
// //         .map_err(|e| {
// //             debug!(
// //                 "Auth Repo-> get_user_by_email -> Failed to execute query: {}",
// //                 e
// //             );
// //             AppError::InvalidInput
// //         })?
// //         .iter()
// //         .map(|row| User::from_row_ref(row).unwrap())
// //         .collect::<Vec<User>>()
// //         .pop())
// // }
