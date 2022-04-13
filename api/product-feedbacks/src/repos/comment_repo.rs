use crate::models::comment_model::{Comment, NewComment, UpdateComment};
use prelude::{errors::AppError, Result};

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::debug;

/**
 *  - Get All comments
 */
pub async fn all_comments(client: &Client) -> Result<Vec<Comment>> {
    let stmt = client
        .prepare(
            &r#"
        SELECT 
            c.comment_id,
            c.content,
            c.parent_id,
            c.replying_to,
            c.created_at,
            c.updated_at, 
            replies,
            row_to_json(u) AS user
        FROM comments c
        LEFT JOIN (
                SELECT
                    parent_id,
                    COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies
                FROM (
                    SELECT  
                        c.comment_id,
                        c.content,
                        c.parent_id,
                        c.replying_to,
                        c.created_at,
                        c.updated_at,
                          row_to_json(u) AS user FROM COMMENTS AS c
                    JOIN (
                        SELECT 
                            user_id, 
                            username, 
                            avatar,
                            firstname, 
                            lastname
                        FROM users) u USING(user_id)) AS replies
                GROUP BY parent_id) AS abc 
                ON c.comment_id = abc.parent_id
        JOIN (SELECT 
            user_id, 
            username, 
            avatar,
            firstname, 
            lastname
        FROM users) u USING(user_id);	
        "#,
        )
        .await?;

    let comments = client
        .query(&stmt, &[])
        .await?
        .iter()
        .map(|row| Comment::from_row_ref(row).unwrap())
        .collect::<Vec<Comment>>();
    Ok(comments)
}

/**
 *  - Get comment by id
 */
pub async fn get_comment_by_id(client: &Client, comment_id: &i32) -> Result<Option<Comment>> {
    let stmt = client
        .prepare(
            &r#"
        SELECT 
            c.comment_id,
            c.content,
            c.parent_id,
            c.replying_to,
            c.created_at,
            c.updated_at, 
            replies,
            row_to_json(u) AS user
        FROM comments c
        LEFT JOIN (
                SELECT
                    parent_id,
                    COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies
                FROM (
                    SELECT  
                        c.comment_id,
                        c.content,
                        c.parent_id,
                        c.replying_to,
                        c.created_at,
                        c.updated_at,
                          row_to_json(u) AS user FROM COMMENTS AS c
                    JOIN (
                        SELECT 
                            user_id, 
                            username, 
                            avatar,
                            firstname, 
                            lastname
                        FROM users) u USING(user_id)) AS replies
                GROUP BY parent_id) AS replies 
                ON c.comment_id = replies.parent_id
        JOIN (SELECT 
            user_id, 
            username, 
            avatar,
            firstname, 
            lastname
        FROM users) u USING(user_id)
        WHERE c.comment_id = $1;
        "#,
        )
        .await?;

    let comment = client
        .query(&stmt, &[comment_id])
        .await?
        .iter()
        .map(|row| Comment::from_row_ref(row).unwrap())
        .collect::<Vec<Comment>>()
        .pop();
    Ok(comment)
}

/**
 *  - Get Comment by feedback_id
 */
pub async fn get_comment_by_feedback_id(
    client: &Client,
    feedback_id: &i32,
) -> Result<Vec<Comment>> {
    let stmt = client
        .prepare(
            &r#"
    SELECT * FROM (
        SELECT 
            c.comment_id,
            c.content,
            c.parent_id,
            c.replying_to,
            c.created_at,
            c.updated_at, 
            replies,
            row_to_json(u) AS user
        FROM comments c
        LEFT JOIN (
                SELECT
                    parent_id,
                    COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies
                FROM (
                    SELECT  
                        c.comment_id,
                        c.content,
                        c.parent_id,
                        c.replying_to,
                        c.created_at,
                        c.updated_at,
                        row_to_json(u) AS user 
                    FROM COMMENTS AS c
                    JOIN (
                        SELECT 
                            user_id, 
                            username, 
                            avatar,
                            firstname, 
                            lastname
                        FROM users) u USING(user_id)) AS replies
                GROUP BY parent_id) AS replies 
                ON c.comment_id = replies.parent_id
        JOIN (SELECT 
            user_id, 
            username, 
            avatar,
            firstname, 
            lastname
        FROM users) u USING(user_id)
        WHERE c.feedback_id  = $1) AS banana 
    WHERE parent_id IS NULL;
        "#,
        )
        .await?;

    Ok(client
        .query(&stmt, &[feedback_id])
        .await?
        .iter()
        .map(|row| Comment::from_row_ref(row).unwrap())
        .collect::<Vec<Comment>>())
}

/**
 *  - Add comment to feedback
 */
pub async fn add_comment_to_feedback(client: &Client, new_comment: &NewComment) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
            INSERT INTO comments (content, user_id, replying_to, parent_id, feedback_id)
                      VALUES($1, $2, $3, $4, $5) RETURNING comment_id"#,
        )
        .await?;

    let NewComment {
        feedback_id,
        content,
        user_id,
        parent_id,
        replying_to,
    } = new_comment;

    match client
        .query(
            &stmt,
            &[&content, &user_id, &replying_to, &parent_id, &feedback_id],
        )
        .await
        .map_err(|e| {
            debug!("{e}");
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| row.get("comment_id"))
        .collect::<Vec<i32>>()
        .pop()
    {
        Some(comment_id) => Ok(comment_id),
        None => Err(AppError::IntervalServerError),
    }
}

/// Update comment by id
pub async fn update_comment(client: &Client, update_comment: &UpdateComment) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
            UPDATE comments
            SET content = $1 
            WHERE comment_id= $2 AND user_id = $3;"#,
        )
        .await?;

    let affected = client
        .execute(
            &stmt,
            &[
                &update_comment.content,
                &update_comment.comment_id,
                &update_comment.user_id,
            ],
        )
        .await
        .map_err(|_| AppError::InvalidInput)?;

    Ok(affected as i32)
}

/// Delete comment by id
pub async fn delete_comment_by_id(client: &Client, comment_id: &i32) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
            DELETE 
            FROM comments
            WHERE comment_id = $1;"#,
        )
        .await?;

    let affected = client
        .execute(&stmt, &[comment_id])
        .await
        .map_err(|_| AppError::InvalidInput)?;

    Ok(affected as i32)
}
