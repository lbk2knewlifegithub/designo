use crate::models::user_model::NewUser;
use crate::models::user_model::UpdateAccount;
use crate::models::user_model::User;
use prelude::{errors::AppError, Result};

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::debug;
use tracing::error;

/// Get All Users Repo
pub async fn _all_users(client: &Client) -> Result<Vec<User>> {
    let stmt = client
        .prepare(&r#"SELECT * FROM users;"#)
        .await
        .expect("Auth Repo -> all_users -> Error preparing statement");

    Ok(client
        .query(&stmt, &[])
        .await
        .expect("Auth Repo -> all_users -> Error execute statement")
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>())
}

/// Get User By user_id Repo
pub async fn get_user_by_id(client: &Client, user_id: &i32) -> Result<Option<User>> {
    let stmt = client
        .prepare(&r#"SELECT * FROM users WHERE user_id = $1;"#)
        .await
        .expect("Auth Repo -> get_user_by_id -> Error preparing statement");

    Ok(client
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop())
}

/// Get User By username Repo
pub async fn get_user_by_username(client: &Client, username: &str) -> Result<Option<User>> {
    let stmt = client
        .prepare(&r#"SELECT * FROM users WHERE username = $1;"#)
        .await?;

    Ok(client
        .query(&stmt, &[&username])
        .await
        .expect("Auth -> get_user_by_username -> Failed to execute query")
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop())
}

/// Get User By email Repo
pub async fn get_user_by_email(client: &Client, email: &str) -> Result<Option<User>> {
    let stmt = client
        .prepare(&r#"SELECT * FROM users WHERE email = $1;"#)
        .await
        .expect("Auth Repo-> get_user_by_email -> Error preparing statement");

    Ok(client
        .query(&stmt, &[&email])
        .await
        .map_err(|e| {
            debug!(
                "Auth Repo-> get_user_by_email -> Failed to execute query: {}",
                e
            );
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop())
}

/// Create New user Repo
pub async fn create_user<'a>(client: &Client, new_user: &NewUser<'a>) -> Result<User> {
    let stmt = client
        .prepare(
            &r#"INSERT INTO users 
            (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *;"#,
        )
        .await?;

    let NewUser {
        firstname,
        lastname,
        username,
        hashed_password,
    } = new_user;
    Ok(client
        .query(&stmt, &[&firstname, &lastname, &username, &hashed_password])
        .await
        .map_err(|e| {
            error!("Auth -> create_user -> Failed to execute query: {}", e);
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| User::from_row_ref(row).unwrap())
        .collect::<Vec<User>>()
        .pop()
        .ok_or(AppError::IntervalServerError)?)
}

/// Update Account Repo
pub async fn update_account(client: &Client, update_account: &UpdateAccount) -> Result<()> {
    // let stmt = client
    //     .prepare(
    //         &r#"
    //         UPDATE users u
    //         SET
    //             firstname = $1,
    //             lastname = $2,
    //             email = $3,
    //             verified = CASE
    //                     WHEN u.email IS NOT NULL AND u.email = $4 AND  u.verified IS NOT NULL
    //                     THEN true
    //                     ELSE false END
    //         WHERE user_id = $5;
    //         "#,
    //     )
    //     .await
    //     .expect("Auth -> update_account -> Error preparing statement");

    let stmt = client
        .prepare(
            &r#"
            UPDATE users u
            SET 
                firstname = $1, 
                lastname = $2
            WHERE user_id = $3;
            "#,
        )
        .await
        .expect("Auth -> update_account -> Error preparing statement");

    let affected = client
        .execute(
            &stmt,
            &[
                &update_account.firstname,
                &update_account.lastname,
                // &update_account.email,
                // &update_account.email,
                &update_account.user_id,
            ],
        )
        .await
        .map_err(|e| {
            debug!("Auth -> update_account -> Failed to execute query: {}", e);
            AppError::InvalidInput
        })?;

    if affected == 1 {
        return Ok(());
    }

    Err(AppError::RecordNotFound)
}

/// Delete Account Repo
pub async fn delete_account(client: &Client, user_id: &i32) -> Result<()> {
    let stmt = client
        .prepare(&r#"DELETE FROM users WHERE user_id = $1"#)
        .await
        .expect("Auth -> delete_account -> Error preparing statement");

    let affected = client.execute(&stmt, &[user_id]).await.map_err(|e| {
        debug!(
            "Auth Repo -> delete_account -> Failed to execute query: {}",
            e
        );
        AppError::InvalidInput
    })?;

    if affected == 1 {
        return Ok(());
    }

    Err(AppError::RecordNotFound)
}

/// Change Password Repo
pub async fn change_password(client: &Client, user_id: &i32, new_password: &str) -> Result<()> {
    let stmt = client
        .prepare(&r#"UPDATE users SET password = $1 WHERE user_id= $2"#)
        .await
        .expect("Auth -> change_password -> Error preparing statement");

    let affected = client
        .execute(&stmt, &[&new_password, user_id])
        .await
        .map_err(|e| {
            debug!(
                "Auth Repo -> change_password -> Failed to execute query: {}",
                e
            );
            AppError::InvalidInput
        })?;

    if affected == 1 {
        return Ok(());
    }

    Err(AppError::RecordNotFound)
}

/// Verify Email
pub async fn verify_email(client: &Client, user_id: &i32) -> Result<()> {
    let stmt = client
        .prepare(&r#"UPDATE users SET verified = true WHERE user_id= $1"#)
        .await
        .expect("Auth -> verify_email -> Error preparing statement");

    let affected = client.execute(&stmt, &[user_id]).await.map_err(|e| {
        debug!(
            "Auth Repo -> verify_email -> Failed to execute query: {}",
            e
        );
        AppError::InvalidInput
    })?;

    if affected == 1 {
        return Ok(());
    }

    Err(AppError::RecordNotFound)
}
