use crate::{
    dto::{auth_dto::Token, github_dto::GithubCode},
    services::auth_service,
    AuthState,
};

use actix_web::{
    web::{self, Query},
    HttpResponse,
};
use actix_web_validator::Json;
use prelude::{errors::github_error::GithubError, Result};

// Login With Github
async fn login_github(
    state: web::Data<AuthState>,
    query: Query<GithubCode>,
) -> Result<HttpResponse> {
    let code = query.into_inner().code.ok_or(GithubError::CodeNotFound)?;

    auth_service::login_github(&state, &code)
        .await
        .map(|token| HttpResponse::Ok().json(token))
        .map_err(Into::into)
}

/// Me
async fn me(state: web::Data<AuthState>, json: Json<Token>) -> Result<HttpResponse> {
    auth_service::me(&state, &json.into_inner().token)
        .await
        .map(|user| HttpResponse::Created().json(user))
        .map_err(Into::into)
}

///  Configure Auth Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            // Login
            .service(
                // Login
                web::scope("/login").service(
                    // Login
                    web::resource("/github").route(
                        // Login Github
                        web::get().to(login_github),
                    ),
                ),
            )
            // Me
            .service(
                // Me
                web::scope("/me").service(
                    // Me
                    web::resource("")
                        // Me
                        .route(web::post().to(me)),
                ),
            ),
    );
}
