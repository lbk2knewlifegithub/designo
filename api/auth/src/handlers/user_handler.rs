use actix_web::{
    web::{self, Query},
    HttpRequest, HttpResponse,
};
use actix_web_validator::Json;
use serde::Deserialize;

use crate::dto::user_dto::UsernameExistsDTO;
use crate::{services::user_service, AuthState};
use prelude::Result;

#[derive(Deserialize)]
struct Info {
    username: String,
}
/// Get All Users
async fn get_users(
    state: web::Data<AuthState>,
    req: HttpRequest,
    query: Query<Info>,
) -> Result<HttpResponse> {
    state.jwt.authorize(&req).await?;
    let Info { username } = query.into_inner();
    if username.len() < 3 && username.len() > 100 {
        return Ok(HttpResponse::BadRequest().finish());
    }

    user_service::get_user_by_username(&state, &username)
        .await
        .map(|user| HttpResponse::Ok().json(user))
        .map_err(Into::into)
}

/// Username exists Handler
async fn username_exists(
    state: web::Data<AuthState>,
    username_exists_dto: Json<UsernameExistsDTO>,
) -> Result<HttpResponse> {
    user_service::username_exists(&state, &username_exists_dto.into_inner().username)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

// /// Email exists Handler
// async fn email_exists(
//     state: web::Data<AuthState>,
//     email_exists_dto: Json<EmailExistsDTO>,
// ) -> Result<HttpResponse> {
//     user_service::email_exists(&state, &email_exists_dto.into_inner().email)
//         .await
//         .map(|_| HttpResponse::NoContent().finish())
//         .map_err(Into::into)
// }

///  Delete User By Id
// async fn delete_user(state: web::Data<AuthState>, user_id: web::Path<i32>) -> Result<HttpResponse> {
//     let client = state.pool.get().await?;
//     convert(user_repo::delete_account(&client, user_id.into_inner()).await)
// }

/// Configure Users Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(
                web::resource("")
                    // Get All Users
                    .route(web::get().to(get_users)),
            )
            // .service(web::scope("/{user_id}").service(
            //         web::resource("")
            //             // // Delete user
            //             // .route(web::delete().to(delete_user)),
            //     ))
            .service(
                web::scope("/exists")
                    .service(
                        // Check if exists by username
                        web::resource("/username")
                            // Check if exists by username
                            .route(web::post().to(username_exists)),
                    )
                    // .service(
                    //     web::resource("/email")
                    //         // Check if exists by email
                    //         .route(web::post().to(email_exists)),
                    // ),
            ),
    );
}
