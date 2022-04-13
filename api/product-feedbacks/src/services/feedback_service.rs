use crate::{
    dto::feedback_dto::{CreateFeedbackDTO, UpdateFeedbackDTO},
    models::feedback_model::{
        DeleteFeedback, Downvote, Feedback, NewFeedback, UpdateFeedback, Upvote,
    },
    repos::{category_repo, feedback_repo, status_repo},
    FeedbacksState,
};
use prelude::{errors::AppError, Result};

///  All feedbacks Service
pub async fn all_feedbacks(state: &FeedbacksState, user_id: &Option<i32>) -> Result<Vec<Feedback>> {
    let client = state.db.read.get().await?;
    Ok(feedback_repo::all_feedbacks(&client, user_id).await?)
}

/// Get feedback by id Service
pub async fn get_feedback_by_id(state: &FeedbacksState, feedback_id: &i32) -> Result<Feedback> {
    let client = state.db.read.get().await?;

    match feedback_repo::get_feedback_by_id(&client, &feedback_id).await? {
        Some(feedback) => Ok(feedback),
        None => Err(AppError::RecordNotFound),
    }
}

/// Delete feedback by id Service
pub async fn delete_feedback(
    state: &FeedbacksState,
    delete_feedback: &DeleteFeedback,
) -> Result<()> {
    let client = state.db.write.get().await?;

    let affected = feedback_repo::delete_feedback(&client, &delete_feedback).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}

/// Update feedback by id Service
pub async fn update_feedback(
    state: &FeedbacksState,
    feedback_id: &i32,
    user_id: &i32,
    update_feedback_dto: &UpdateFeedbackDTO,
) -> Result<()> {
    let client_read = state.db.read.get().await?;
    let client_read_write = state.db.write.get().await?;

    // Get category
    let category =
        match category_repo::get_category_by_name(&client_read, &update_feedback_dto.category)
            .await?
        {
            Some(category) => category,
            None => return Err(AppError::InvalidInput),
        };

    // Get status
    let status =
        match status_repo::get_status_by_name(&client_read, &update_feedback_dto.status).await? {
            Some(status) => status,
            None => return Err(AppError::InvalidInput),
        };

    // Create UpdateFeedback
    let update_feedback = UpdateFeedback {
        feedback_id: feedback_id.to_owned(),
        user_id: user_id.to_owned(),
        category_id: category.category_id,
        status_id: status.status_id,
        title: update_feedback_dto.title.to_owned(),
        description: update_feedback_dto.description.to_owned(),
    };

    // Update Feedback
    let affected = feedback_repo::update_feedback(&client_read_write, &update_feedback).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}

/// Create Feedback Service
pub async fn create_feedback(
    state: &FeedbacksState,
    user_id: &i32,
    create_feedback_dto: &CreateFeedbackDTO,
) -> Result<Feedback> {
    // Connect to pool
    let client_read = state.db.read.get().await?;
    let client_read_write = state.db.write.get().await?;

    // check category exists
    let category =
        match category_repo::get_category_by_name(&client_read, &create_feedback_dto.category)
            .await?
        {
            Some(category) => category,
            None => return Err(AppError::InvalidInput),
        };

    let new_feedback = NewFeedback::new(&create_feedback_dto, user_id, &category.category_id);
    // Create feedback and return back feedback_id
    let feedback_id =
        match feedback_repo::create_feedback(&client_read_write, &new_feedback).await? {
            Some(feedback_id) => feedback_id,
            None => return Err(AppError::IntervalServerError),
        };

    // Find feedback by id all return to client
    match feedback_repo::get_feedback_by_id(&client_read, &feedback_id).await? {
        Some(feedback) => Ok(feedback),
        None => Err(AppError::IntervalServerError),
    }
}

/// Upvote Feedback Service
pub async fn upvote_feedback(state: &FeedbacksState, upvote: &Upvote) -> Result<()> {
    let client = state.db.write.get().await?;
    // Upvote feedback in database
    let affected = feedback_repo::upvote_feedback(&client, upvote).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}

/// Downvote Feedback
pub async fn downvote_feedback(state: &FeedbacksState, downvote: &Downvote) -> Result<()> {
    let client = state.db.write.get().await?;
    // Downvote feedback in database
    let affected = feedback_repo::downvote_feedback(&client, downvote).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}
