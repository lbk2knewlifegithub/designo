use crate::{dto::report_dto::ReportDTO, services::report_service, ReportState};
use actix_web::{
    web::{self},
    HttpResponse,
};
use actix_web_validator::Json;
use prelude::Result;

/// Report Handler
async fn create_report(
    state: web::Data<ReportState>,
    json: Json<ReportDTO>,
) -> Result<HttpResponse> {
    let report_dto = json.into_inner();
    report_service::create_report(&state, &report_dto)
        .await
        .map(|reports| HttpResponse::Ok().json(reports))
        .map_err(Into::into)
}

/// Configure Report Handlers
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/").service(
            web::resource("")
                // Report
                .route(
                    // Report
                    web::post().to(create_report),
                ),
        ),
    );
}
