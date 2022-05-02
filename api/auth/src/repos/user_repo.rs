use crate::models::{github_model::UserGithub, user_model::User};
use deadpool_postgres::Transaction;
use prelude::{errors::AppError, Result};

use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::error;

// /// Get All Users Repo
// pub async fn _all_users(client: &Client) -> Result<Vec<User>> {
//     let stmt = client
//         .prepare(&r#"SELECT * FROM users;"#)
//         .await
//         .expect("Auth Repo -> all_users -> Error preparing statement");

//     Ok(client
//         .query(&stmt, &[])
//         .await
//         .expect("Auth Repo -> all_users -> Error execute statement")
//         .iter()
//         .map(|row| User::from_row_ref(row).unwrap())
//         .collect::<Vec<User>>())
// }

/// Get User By user_id Repo
pub async fn get_user_by_id(trans: &Transaction<'_>, user_id: &i32) -> Result<Option<User>> {
    let stmt = trans
        .prepare(&r#"SELECT * FROM public.users WHERE user_id = $1;"#)
        .await
        .expect("Auth Repo -> get_user_by_id -> Error preparing statement");

    Ok(trans
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop())
}

/// Get User By username Repo
pub async fn get_user_by_username(trans: &Transaction<'_>, username: &str) -> Result<Option<User>> {
    let stmt = trans
        .prepare(&r#"SELECT * FROM public.users WHERE username = $1;"#)
        .await?;

    match trans.query_one(&stmt, &[&username]).await {
        Ok(row) => Ok(Some(User::from_row_ref(&row).expect(
            "GET_USER_BY_USERNAME REPO Error When converting row to User",
        ))),
        Err(e) => {
            error!("GET_USER_BY_USERNAME REPO  {e}");
            Ok(None)
        }
    }
}

/// Create New user Repo
pub async fn create_user(trans: &Transaction<'_>, user_github: &UserGithub) -> Result<User> {
    let stmt = trans
        .prepare(
            &r#"INSERT INTO public.users
            (name, username, email, avatar) VALUES($1, $2, $3, $4) RETURNING *;"#,
        )
        .await?;

    let UserGithub {
        name,
        login,
        avatar_url,
        email,
    } = user_github;

    Ok(trans
        .query(
            &stmt,
            &[
                &name.to_owned().unwrap_or(login.to_owned()),
                &login,
                &email,
                &avatar_url,
            ],
        )
        .await
        .map_err(|e| {
            error!("Create User Error  -> Failed to execute query: {}", e);
            AppError::BadRequest("CreateUserError".to_owned(), "create user error".to_owned())
        })?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop()
        .ok_or(AppError::IntervalServerError())?)
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
