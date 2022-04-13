use actix_web::web;
use actix_web::HttpRequest;
use actix_web::HttpResponse;
use actix_web_validator::Json;

use crate::dto::user_dto::EmailExistsDTO;
use crate::dto::user_dto::UsernameExistsDTO;
use crate::{services::user_service, AuthState};
use prelude::Result;

/// Get All Users
async fn get_users(_state: web::Data<AuthState>, _req: HttpRequest) -> Result<HttpResponse> {
    // let _user_token = auth_middleware(&req, &state);
    // let client = state.pool.get().await?;
    // convert(user_repo::all_users(&client).await)
    panic!("Not implemented");
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

/// Email exists Handler
async fn email_exists(
    state: web::Data<AuthState>,
    email_exists_dto: Json<EmailExistsDTO>,
) -> Result<HttpResponse> {
    user_service::email_exists(&state, &email_exists_dto.into_inner().email)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

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
                    .service(
                        web::resource("/email")
                            // Check if exists by email
                            .route(web::post().to(email_exists)),
                    ),
            ),
    );
}
