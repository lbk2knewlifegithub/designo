use crate::{dto::challenge_dto::ChallengeDTO, services::challenges_service, FrontendMentorState};
use actix_web::{
    web::{self},
    HttpRequest, HttpResponse,
};
use actix_web_validator::Json;
use prelude::Result;

static CHALLENGES_CACHE_KEY: &'static str = "fm:challenges";

/// All Challenges Handler
async fn all_challenges(state: web::Data<FrontendMentorState>) -> Result<HttpResponse> {
    if let Some(cached) = state.redis.get(CHALLENGES_CACHE_KEY).await? {
        return Ok(HttpResponse::Ok().body(cached));
    }

    let challenges =
        serde_json::to_string(&challenges_service::all_challenges(&state).await?).unwrap();

    state
        .redis
        .set(CHALLENGES_CACHE_KEY, &challenges, 1_000)
        .await?;

    return Ok(HttpResponse::Ok().body(challenges));
}

/// Create Challenge
async fn create_challenge(
    state: web::Data<FrontendMentorState>,
    req: HttpRequest,
    json: Json<ChallengeDTO>,
) -> Result<HttpResponse> {
    let challenge_dto = json.into_inner();
    state.jwt.authorize(&req, true).await?;

    match challenges_service::create_challenge(&state, &challenge_dto).await {
        Ok(_) => Ok(HttpResponse::Created().finish()),
        Err(e) => Err(e),
    }
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
    )
    .service(
        // Challenge
        web::scope("/challenge").service(
            web::resource("")
                // Challenge
                .route(
                    // Create Challenge
                    web::post().to(create_challenge),
                ),
        ),
    );
}
