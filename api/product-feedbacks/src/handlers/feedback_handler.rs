use crate::{
    dto::{
        comment_dto::{AddCommentDTO, UpdateCommentDTO},
        feedback_dto::{CreateFeedbackDTO, UpdateFeedbackDTO},
    },
    models::{
        comment_model::{NewComment, UpdateComment},
        feedback_model::{DeleteFeedback, Downvote, Upvote},
    },
    services::{comment_service, feedback_service},
    FeedbacksState,
};

use actix_web::{web, web::Path, HttpRequest, HttpResponse};
use actix_web_validator::Json;
use prelude::Result;

/// All feedbacks Route
async fn all_feedbacks(state: web::Data<FeedbacksState>, req: HttpRequest) -> Result<HttpResponse> {
    let user_id = match state.jwt.authorize(&req).await {
        Ok(user_token) => Some(user_token.user_id),
        Err(_) => None,
    };

    feedback_service::all_feedbacks(&state, &user_id)
        .await
        .map(|feedbacks| HttpResponse::Ok().json(feedbacks))
        .map_err(Into::into)
}

/// Get Feedback by id Route
async fn get_feedback_by_id(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
) -> Result<HttpResponse> {
    feedback_service::get_feedback_by_id(&state, &feedback_id.into_inner())
        .await
        .map(|feedback| HttpResponse::Ok().json(feedback))
        .map_err(Into::into)
}

/// Delete feedback by id Route
async fn delete_feedback_by_id(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let delete_feedback = DeleteFeedback::new(&feedback_id.into_inner(), &user_token.user_id);
    feedback_service::delete_feedback_by_id(&state, &delete_feedback)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Update feedback Route
async fn update_feedback<'a>(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    update_feedback_dto: Json<UpdateFeedbackDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    feedback_service::update_feedback(
        &state,
        &feedback_id,
        &user_token.user_id,
        &update_feedback_dto.into_inner(),
    )
    .await
    .map(|_| HttpResponse::NoContent().finish())
    .map_err(Into::into)
}

/// Create Feedback Route
async fn create_feedback(
    state: web::Data<FeedbacksState>,
    create_feedback_dto: Json<CreateFeedbackDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;
    feedback_service::create_feedback(
        &state,
        &user_token.user_id,
        &create_feedback_dto.into_inner(),
    )
    .await
    .map(|feedback| HttpResponse::Ok().json(feedback))
    .map_err(Into::into)
}

/// Upvote Feedback Route
async fn upvote_feedback(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let upvote = Upvote::new(&feedback_id.into_inner(), &user_token.user_id);
    feedback_service::upvote_feedback(&state, &upvote)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Downvote Feedback Route
async fn downvote_feedback(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let downvote = Downvote::new(&feedback_id.into_inner(), &user_token.user_id);
    feedback_service::downvote_feedback(&state, &downvote)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// All comments Route
async fn all_comments(state: web::Data<FeedbacksState>) -> Result<HttpResponse> {
    comment_service::all_comments(&state)
        .await
        .map(|comments| HttpResponse::Ok().json(comments))
        .map_err(Into::into)
}

/// Get Comment by id Route
async fn get_comment_by_id(
    state: web::Data<FeedbacksState>,
    comment_id: web::Path<i32>,
) -> Result<HttpResponse> {
    comment_service::get_comment_by_id(&state, &comment_id)
        .await
        .map(|comment| HttpResponse::Ok().json(comment))
        .map_err(Into::into)
}

///  Get Comment By feedback_id
async fn get_comment_by_feedback_id(
    state: web::Data<FeedbacksState>,
    feedback_id: web::Path<i32>,
) -> Result<HttpResponse> {
    comment_service::get_comment_by_feedback_id(&state, &feedback_id)
        .await
        .map(|comments| HttpResponse::Ok().json(comments))
        .map_err(Into::into)
}

///  Add Comment To Feedback
async fn add_comment_to_feedback(
    state: web::Data<FeedbacksState>,
    req: HttpRequest,
    feedback_id: web::Path<i32>,
    add_comment_to_feedback_dto: Json<AddCommentDTO>,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let new_comment = NewComment::new(
        &feedback_id.into_inner(),
        &user_token.user_id,
        &add_comment_to_feedback_dto.into_inner(),
    );
    comment_service::add_comment_to_feedback(&state, &new_comment)
        .await
        .map(|component_response| HttpResponse::Created().json(component_response))
        .map_err(Into::into)
}

///  Update comment by id
async fn update_comment_by_id(
    state: web::Data<FeedbacksState>,
    comment_id: web::Path<i32>,
    update_comment_dto: Json<UpdateCommentDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;
    let update_comment = UpdateComment::new(
        &comment_id.into_inner(),
        &user_token.user_id,
        &update_comment_dto.content.to_owned(),
    );
    comment_service::update_comment(&state, &update_comment)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Delete comment by id
async fn delete_comment_by_id(
    state: web::Data<FeedbacksState>,
    comment_id: web::Path<i32>,
) -> Result<HttpResponse> {
    comment_service::delete_comment_by_id(&state, &comment_id)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Configure Feedback Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            .service(
                web::resource("/")
                    // Get All Feedbacks
                    .route(web::get().to(all_feedbacks))
                    // Create Feedbacks
                    .route(web::post().to(create_feedback)),
            )
            // Comments
            .service(
                // Comments
                web::scope("/comments")
                    .service(
                        // Comments
                        web::resource("")
                            // Comments
                            .route(web::get().to(all_comments)),
                    )
                    .service(
                        // Comments Id
                        web::resource("/{comment_id}")
                            // Get Comments By Id
                            .route(web::get().to(get_comment_by_id))
                            // Update comment by id
                            .route(web::put().to(update_comment_by_id))
                            // Delete comment by id
                            .route(web::delete().to(delete_comment_by_id)),
                    )
                    .service(
                        // Feedack
                        web::resource("/{feedback_id}/feedback")
                            // Get Comment Of Feedback By feedback_id
                            .route(web::get().to(get_comment_by_feedback_id))
                            // Add comment to feedback
                            .route(web::post().to(add_comment_to_feedback)),
                    ),
            )
            // Single Feedback
            .service(
                web::scope("/feedback").service(
                    web::scope("/{feedback_id}")
                        // Feedback
                        .service(
                            // Feedback
                            web::resource("")
                                // Get feedback by Id
                                .route(web::get().to(get_feedback_by_id))
                                // Delete feedback by Id
                                .route(web::delete().to(delete_feedback_by_id))
                                // Update feedback by Id
                                .route(web::put().to(update_feedback)),
                        )
                        // Upvote
                        .service(
                            // Upvote
                            web::resource("/upvote").route(
                                // Upvote
                                web::patch().to(upvote_feedback),
                            ),
                        )
                        // Downvote
                        .service(
                            // Downvote
                            web::resource("/downvote").route(
                                // Downvote
                                web::patch().to(downvote_feedback),
                            ),
                        ),
                ),
            ),
    );
}
