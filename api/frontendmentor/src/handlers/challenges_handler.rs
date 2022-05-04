use crate::FrontendMentorState;
use actix_web::{
    web::{self, Path},
    HttpRequest, HttpResponse,
};
use actix_web_validator::Json;
use prelude::Result;

/// All Challenges Handler
async fn all_challenges(
    state: web::Data<FrontendMentorState>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    // challenges_service::all_challenges(&state)
    //     .await
    //     .map(|invoices| HttpResponse::Ok().json(invoices))
    //     .map_err(Into::into)

    Ok(HttpResponse::Ok().body("All challenges"))
}

/// Configure Invoices Handlers
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/challenges").service(
            web::resource("")
                // Get All Challenges
                .route(
                    // Get All Challenges
                    web::get().to(all_challenges),
                ),
        ),
    );
}
