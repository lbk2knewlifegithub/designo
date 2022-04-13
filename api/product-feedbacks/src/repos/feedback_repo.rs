use crate::models::feedback_model::{
    DeleteFeedback, Downvote, Feedback, NewFeedback, UpdateFeedback, Upvote,
};
use prelude::{
    errors::{feedback_error::FeedbackError, AppError},
    Result,
};

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use tokio_postgres::error::SqlState;
use tracing::{debug, error};

/**
 *  - Get All Feedbacks
 */
pub async fn all_feedbacks(client: &Client, user_id: &Option<i32>) -> Result<Vec<Feedback>> {
    let stmt = client
        .prepare(
            &r#"
            SELECT 
                f.feedback_id, 
                f.title, 
                f.user_id,
                c.name AS category, 
                (SELECT COUNT(*) FROM upvotes up WHERE up.feedback_id = f.feedback_id)::INTEGER AS upvotes,
                EXISTS (SELECT * FROM upvotes up WHERE up.feedback_id = f.feedback_id AND up.user_id = $1)::BOOLEAN AS upvoted,
                s.name AS status, 
                f.description,
                f.created_at,
                f.updated_at,
                (SELECT COUNT(*) FROM comments c WHERE c.feedback_id = f.feedback_id)::INTEGER AS comments_length
            FROM feedbacks f
            LEFT JOIN categories c USING(category_id)
            LEFT JOIN statuses s USING (status_id)
            ORDER BY upvotes DESC;"#,
        )
        .await?;

    Ok(client
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| Feedback::from_row_ref(row).unwrap())
        .collect::<Vec<Feedback>>())
}

/**
 *  - Get Feedback By id
 */
pub async fn get_feedback_by_id(client: &Client, feedback_id: &i32) -> Result<Option<Feedback>> {
    let stmt = client
        .prepare(
            &r#"
SELECT 
            f.feedback_id, 
            f.title, 
            f.user_id,
            c.name AS category, 
            (SELECT COUNT(*) FROM upvotes up WHERE up.feedback_id = f.feedback_id)::INTEGER AS upvotes, 
            EXISTS (SELECT * FROM upvotes up WHERE up.feedback_id = f.feedback_id AND up.user_id = $1)::BOOLEAN AS upvoted,
            s.name AS status, 
            f.description,
            f.created_at,
            f.updated_at,
            (SELECT COUNT(*) FROM comments c WHERE c.feedback_id = f.feedback_id)::INTEGER AS comments_length
FROM feedbacks f
LEFT JOIN categories c USING(category_id)
LEFT JOIN statuses s USING (status_id)
WHERE f.feedback_id = $1
ORDER BY upvotes DESC;"#,
        )
        .await?;

    Ok(client
        .query(&stmt, &[feedback_id])
        .await?
        .iter()
        .map(|row| Feedback::from_row_ref(row).unwrap())
        .collect::<Vec<Feedback>>()
        .pop())
}

/**
 *  - Create feedback and return feedback_id
 */
pub async fn create_feedback(client: &Client, new_feedback: &NewFeedback) -> Result<Option<i32>> {
    let stmt = client
        .prepare(
            &r#"
        INSERT INTO feedbacks (
            title, 
            category_id, 
            description, 
            user_id)
        VALUES($1, $2, $3, $4) RETURNING feedback_id;"#,
        )
        .await?;

    Ok(client
        .query(
            &stmt,
            &[
                &new_feedback.title,
                &new_feedback.category_id,
                &new_feedback.description,
                &new_feedback.user_id,
            ],
        )
        .await
        .map_err(|e| {
            error!("{}", e);
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| row.get("feedback_id"))
        .collect::<Vec<i32>>()
        .pop())
}

/// Upvote feedback
pub async fn upvote_feedback(client: &Client, upvote: &Upvote) -> Result<i32> {
    let stmt = client
        .prepare(&r#"INSERT INTO upvotes (user_id, feedback_id) VALUES($1, $2);"#)
        .await?;

    let affected = client
        .execute(&stmt, &[&upvote.user_id, &upvote.feedback_id])
        .await
        .map_err(|e| match e.code() {
            Some(c) if c.code() == SqlState::UNIQUE_VIOLATION.code() => {
                FeedbackError::AlreadyUpvote.into()
            }
            _ => AppError::InvalidInput,
        })?;

    Ok(affected as i32)
}

// Downvote feedback
pub async fn downvote_feedback(client: &Client, downvote: &Downvote) -> Result<i32> {
    let stmt = client
        .prepare(&r#"DELETE FROM upvotes WHERE user_id=$1 AND feedback_id=$2;"#)
        .await?;

    let affected = client
        .execute(&stmt, &[&downvote.user_id, &downvote.feedback_id])
        .await?;

    Ok(affected as i32)
}

/// Delete feedback By id
pub async fn delete_feedback_by_id(
    client: &Client,
    delete_feedback: &DeleteFeedback,
) -> Result<i32> {
    let stmt = client
        .prepare(&r#"DELETE FROM feedbacks WHERE feedback_id= $1 AND user_id = $2;"#)
        .await?;

    let affected = client
        .execute(
            &stmt,
            &[&delete_feedback.feedback_id, &delete_feedback.user_id],
        )
        .await
        .map_err(|e| {
            debug!("{e}");
            AppError::InvalidInput
        })?;
    Ok(affected as i32)
}

/// Update feedback
pub async fn update_feedback(client: &Client, update_feedback: &UpdateFeedback) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
        UPDATE feedbacks 
        SET title = $1,
            category_id = $2,
            status_id = $3,
            description = $4,
            updated_at = CURRENT_TIMESTAMP
        WHERE feedback_id = $5 AND user_id = $6;"#,
        )
        .await?;

    let affected = client
        .execute(
            &stmt,
            &[
                &update_feedback.title,
                &update_feedback.category_id,
                &update_feedback.status_id,
                &update_feedback.description,
                &update_feedback.feedback_id,
                &update_feedback.user_id,
            ],
        )
        .await
        .map_err(|_| AppError::InvalidInput)?;

    Ok(affected as i32)
}

/**
 *  - Check feedback exists
 */
pub async fn check_feedback_exists_by_id(client: &Client, feedback_id: &i32) -> Result<bool> {
    let stmt = client
        .prepare(
            &r#"
        SELECT 
            feedback_id 
        FROM feedbacks f
        WHERE f.feedback_id = $1;"#,
        )
        .await?;
    Ok(client
        .query(&stmt, &[feedback_id])
        .await?
        .iter()
        .map(|row| row.get("feedback_id"))
        .collect::<Vec<i32>>()
        .pop()
        .is_some())
}
