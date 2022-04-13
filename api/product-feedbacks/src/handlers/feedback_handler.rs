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

/// Delete feedback Route
async fn delete_feedback(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let delete_feedback_token = format!("deletefeedback:{}", token);

    // Check DDos
    state.ddos.medium.check(&delete_feedback_token).await?;

    let user_token = state.jwt.decode(&token).await?;

    let delete_feedback = DeleteFeedback::new(&feedback_id.into_inner(), &user_token.user_id);

    match feedback_service::delete_feedback(&state, &delete_feedback).await {
        Ok(_) => {
            state.ddos.medium.remember(&delete_feedback_token).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Update feedback Route
async fn update_feedback<'a>(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    update_feedback_dto: Json<UpdateFeedbackDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let update_token = format!("update:{}", token);
    state.ddos.medium.check(&update_token).await?;

    let user_token = state.jwt.decode(&token).await?;

    match feedback_service::update_feedback(
        &state,
        &feedback_id,
        &user_token.user_id,
        &update_feedback_dto.into_inner(),
    )
    .await
    {
        Ok(_) => {
            state.ddos.medium.remember(&update_token).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Create Feedback Route
async fn create_feedback(
    state: web::Data<FeedbacksState>,
    create_feedback_dto: Json<CreateFeedbackDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let create_key = format!("createfeedback:{}", token);

    state.ddos.high.check(&create_key).await?;

    let user_token = state.jwt.decode(&token).await?;

    match feedback_service::create_feedback(
        &state,
        &user_token.user_id,
        &create_feedback_dto.into_inner(),
    )
    .await
    {
        Ok(feedback) => {
            state.ddos.high.remember(&create_key).await?;
            Ok(HttpResponse::Ok().json(feedback))
        }
        Err(e) => Err(e),
    }
}

/// Upvote Feedback Route
async fn upvote_feedback(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let feedback_id = feedback_id.into_inner();
    let upvote_key = format!("upvote:{}:{}", token, feedback_id);

    // Check DDOS protection
    state.ddos.low.check(&upvote_key).await?;

    // Decode token
    let user_token = state.jwt.decode(token.as_str()).await?;

    let upvote = Upvote::new(&feedback_id, &user_token.user_id);

    match feedback_service::upvote_feedback(&state, &upvote).await {
        Ok(()) => {
            state.ddos.low.remember(&upvote_key).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Downvote Feedback Route
async fn downvote_feedback(
    state: web::Data<FeedbacksState>,
    feedback_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let feedback_id = feedback_id.into_inner();
    let downvote_key = format!("downvote:{}:{}", token, feedback_id);

    // Check DDOS protection
    state.ddos.low.check(&downvote_key).await?;

    // Decode token
    let user_token = state.jwt.decode(token.as_str()).await?;

    let downvote = Downvote::new(&feedback_id, &user_token.user_id);

    match feedback_service::downvote_feedback(&state, &downvote).await {
        Ok(()) => {
            state.ddos.low.remember(&downvote_key).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
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
    let token = state.jwt.get_token(&req)?;
    let add_comment_ddos_token = format!("addcomment:{}", token);
    state.ddos.medium.check(&add_comment_ddos_token).await?;

    let user_token = state.jwt.decode(&token).await?;

    let new_comment = NewComment::new(
        &feedback_id.into_inner(),
        &user_token.user_id,
        &add_comment_to_feedback_dto.into_inner(),
    );

    match comment_service::add_comment_to_feedback(&state, &new_comment).await {
        Ok(component_response) => {
            state.ddos.medium.remember(&add_comment_ddos_token).await?;
            Ok(HttpResponse::Created().json(component_response))
        }
        Err(e) => Err(e),
    }
}

///  Update comment by id
async fn update_comment_by_id(
    state: web::Data<FeedbacksState>,
    comment_id: web::Path<i32>,
    update_comment_dto: Json<UpdateCommentDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let update_comment_ddos_token = format!("updatecomment:{}", token);

    state.ddos.medium.check(&update_comment_ddos_token).await?;

    let user_token = state.jwt.decode(&token).await?;

    let update_comment = UpdateComment::new(
        &comment_id.into_inner(),
        &user_token.user_id,
        &update_comment_dto.content.to_owned(),
    );
    match comment_service::update_comment(&state, &update_comment).await {
        Ok(_) => {
            state
                .ddos
                .medium
                .remember(&update_comment_ddos_token)
                .await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Delete comment Handler
async fn delete_comment(
    state: web::Data<FeedbacksState>,
    comment_id: web::Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let delete_comment_ddos_token = format!("deletecomment:{}", token);

    state.ddos.medium.check(&delete_comment_ddos_token).await?;

    let user_token = state.jwt.decode(&token).await?;

    match comment_service::delete_comment(&state, &user_token.user_id, &comment_id).await {
        Ok(_) => {
            state
                .ddos
                .medium
                .remember(&delete_comment_ddos_token)
                .await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
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
                            .route(web::delete().to(delete_comment)),
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
                                .route(web::delete().to(delete_feedback))
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
