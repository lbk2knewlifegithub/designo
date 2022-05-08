// use crate::{
//     dto::comment_dto::{AddCommentDTO, UpdateCommentDTO},
//     models::comment_model::{NewComment, UpdateComment},
//     services::comment_service,
// };
// use actix_web::{web, HttpRequest, HttpResponse};
// use actix_web_validator::Json;
// use prelude::{middlewares::auth_middleware, AppState, Result};

// /// All comments Route
// async fn all_comments(state: web::Data<AppState>) -> Result<HttpResponse> {
//     comment_service::all_comments(&state)
//         .await
//         .map(|comments| HttpResponse::Ok().json(comments))
//         .map_err(Into::into)
// }

// /// Get Comment by id Route
// async fn get_comment_by_id(
//     state: web::Data<AppState>,
//     comment_id: web::Path<i32>,
// ) -> Result<HttpResponse> {
//     comment_service::get_comment_by_id(&state, &comment_id)
//         .await
//         .map(|comment| HttpResponse::Ok().json(comment))
//         .map_err(Into::into)
// }

// ///  Get Comment By feedback_id
// async fn get_comment_by_feedback_id(
//     state: web::Data<AppState>,
//     feedback_id: web::Path<i32>,
// ) -> Result<HttpResponse> {
//     comment_service::get_comment_by_feedback_id(&state, &feedback_id)
//         .await
//         .map(|comments| HttpResponse::Ok().json(comments))
//         .map_err(Into::into)
// }

// ///  Add Comment To Feedback
// async fn add_comment_to_feedback(
//     state: web::Data<AppState>,
//     req: HttpRequest,
//     feedback_id: web::Path<i32>,
//     add_comment_to_feedback_dto: Json<AddCommentDTO>,
// ) -> Result<HttpResponse> {
//     let user_token = auth_middleware(&req, &state).await?;

//     let new_comment = NewComment::new(
//         &feedback_id.into_inner(),
//         &user_token.user_id,
//         &add_comment_to_feedback_dto.into_inner(),
//     );
//     comment_service::add_comment_to_feedback(&state, &new_comment)
//         .await
//         .map(|component_response| HttpResponse::Created().json(component_response))
//         .map_err(Into::into)
// }

// ///  Update comment by id
// async fn update_comment_by_id(
//     state: web::Data<AppState>,
//     comment_id: web::Path<i32>,
//     update_comment_dto: Json<UpdateCommentDTO>,
//     req: HttpRequest,
// ) -> Result<HttpResponse> {
//     let user_token = auth_middleware(&req, &state).await?;
//     let update_comment = UpdateComment::new(
//         &comment_id.into_inner(),
//         &user_token.user_id,
//         &update_comment_dto.content.to_owned(),
//     );
//     comment_service::update_comment(&state, &update_comment)
//         .await
//         .map(|_| HttpResponse::NoContent().finish())
//         .map_err(Into::into)
// }

// /// Delete comment by id
// async fn delete_comment_by_id(
//     state: web::Data<AppState>,
//     comment_id: web::Path<i32>,
// ) -> Result<HttpResponse> {
//     comment_service::delete_comment_by_id(&state, &comment_id)
//         .await
//         .map(|_| HttpResponse::NoContent().finish())
//         .map_err(Into::into)
// }

// /// Configure Feedback Routes
// pub fn configure(cfg: &mut web::ServiceConfig) {
//     // Comments
//     cfg.service(
//         // Comments
//         web::scope("/comments")
//             .service(
//                 // Comments
//                 web::resource("")
//                     // Comments
//                     .route(web::get().to(all_comments)),
//             )
//             .service(
//                 // Comments Id
//                 web::resource("/{comment_id}")
//                     // Get Comments By Id
//                     .route(web::get().to(get_comment_by_id))
//                     // Update comment by id
//                     .route(web::put().to(update_comment_by_id))
//                     // Delete comment by id
//                     .route(web::delete().to(delete_comment_by_id)),
//             )
//             .service(
//                 // Feedack
//                 web::resource("/{feedback_id}/feedback")
//                     // Get Comment Of Feedback By feedback_id
//                     .route(web::get().to(get_comment_by_feedback_id))
//                     // Add comment to feedback
//                     .route(web::post().to(add_comment_to_feedback)),
//             ),
//     );
// }
