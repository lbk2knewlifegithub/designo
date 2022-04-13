use crate::{upload_service, ImagesState};
use actix_multipart::Multipart;
use actix_web::{web, HttpRequest, HttpResponse};
use prelude::Result;

/// Upload Avatar
async fn upload_avatar(
    state: web::Data<ImagesState>,
    req: HttpRequest,
    payload: Multipart,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;
    upload_service::upload_avatar(&state, &user_token.user_id, payload)
        .await
        .map(|avatar| HttpResponse::Created().json(avatar))
        .map_err(Into::into)
}

///  Configure Auth Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/upload")
            // Avatar
            .service(
                // Avatar
                web::scope("/avatar").service(
                    // Avatar
                    web::resource("").route(web::put().to(upload_avatar)),
                ),
            ),
    );
}
