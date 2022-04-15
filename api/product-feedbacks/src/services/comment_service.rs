use crate::{
    models::comment_model::{Comment, NewComment, UpdateComment},
    repos::{comment_repo, feedback_repo},
    FeedbacksState,
};
use prelude::{errors::AppError, Result};

///  All comments Service
pub async fn all_comments(state: &FeedbacksState) -> Result<Vec<Comment>> {
    let client = state.db.pool.get().await?;
    Ok(comment_repo::all_comments(&client).await?)
}

/// Get comment by id Service
pub async fn get_comment_by_id(state: &FeedbacksState, comment_id: &i32) -> Result<Comment> {
    let client = state.db.pool.get().await?;

    match comment_repo::get_comment_by_id(&client, &comment_id).await? {
        Some(comment) => Ok(comment),
        None => Err(AppError::RecordNotFound),
    }
}
/// Update comment by id Service
pub async fn update_comment(state: &FeedbacksState, update_comment: &UpdateComment) -> Result<()> {
    let client = state.db.pool.get().await?;

    let affected = comment_repo::update_comment(&client, update_comment).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}

/// Get comment by feedback_id Service
pub async fn get_comment_by_feedback_id(
    state: &FeedbacksState,
    feedback_id: &i32,
) -> Result<Vec<Comment>> {
    let client = state.db.pool.get().await?;

    // Check feedback_id exists
    if !feedback_repo::check_feedback_exists_by_id(&client, &feedback_id).await? {
        return Err(AppError::RecordNotFound);
    }

    Ok(comment_repo::get_comment_by_feedback_id(&client, &feedback_id).await?)
}

/// Add comment to feedback Service
pub async fn add_comment_to_feedback(
    state: &FeedbacksState,
    new_comment: &NewComment,
) -> Result<Comment> {
    let client = state.db.pool.get().await?;

    let comment_id = comment_repo::add_comment_to_feedback(&client, new_comment).await?;

    Ok(comment_repo::get_comment_by_id(&client, &comment_id)
        .await?
        .unwrap())
}

// Delete Comment Service
pub async fn delete_comment(state: &FeedbacksState, user_id: &i32, comment_id: &i32) -> Result<()> {
    let client = state.db.pool.get().await?;

    let affected = comment_repo::delete_comment(&client, user_id, comment_id).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}
