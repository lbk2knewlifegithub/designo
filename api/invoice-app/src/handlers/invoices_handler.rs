use crate::{
    dto::invoice_dto::CreateInvoiceDTO, models::invoice_model::DeleteInvoice,
    services::invoices_service, InvoiceAppState,
};

use actix_web::{
    web::{self, Path},
    HttpRequest, HttpResponse,
};
use actix_web_validator::Json;
use prelude::Result;

/// All Invoices handler
async fn all_invoices(state: web::Data<InvoiceAppState>, req: HttpRequest) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    invoices_service::all_invoices(&state, &user_token.user_id)
        .await
        .map(|invoices| HttpResponse::Ok().json(invoices))
        .map_err(Into::into)
}

/// Create Invoice Router
async fn create_invoice(
    state: web::Data<InvoiceAppState>,
    create_invoice_dto: Json<CreateInvoiceDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let create_key = format!("createinvoice:{}", token);

    state.ddos.high.check(&create_key).await?;

    let user_token = state.jwt.decode(&token).await?;

    match invoices_service::create_invoice(
        &state,
        &user_token.user_id,
        &create_invoice_dto.into_inner(),
    )
    .await
    {
        Ok(invoice) => {
            state.ddos.high.remember(&create_key).await?;
            Ok(HttpResponse::Ok().json(invoice))
        }
        Err(e) => Err(e),
    }
}

/// Delete Invoice Handler
async fn delete_invoice(
    state: web::Data<InvoiceAppState>,
    invoice_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let delete_feedback_token = format!("delete_invoice:{}", token);

    // Check DDos
    state.ddos.medium.check(&delete_feedback_token).await?;

    // Decode Token
    let user_token = state.jwt.decode(&token).await?;

    let delete_invoice = DeleteInvoice::new(invoice_id.into_inner(), user_token.user_id);

    match invoices_service::delete_invoice(&state, &delete_invoice).await {
        Ok(_) => {
            state.ddos.medium.remember(&delete_feedback_token).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Get Invoice by Id Handler
async fn get_invoice_by_id(
    state: web::Data<InvoiceAppState>,
    invoice_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let delete_feedback_token = format!("get_invoice_by_id:{}", token);

    // Check DDos
    state.ddos.low.check(&delete_feedback_token).await?;

    // Decode Token
    let user_id = state.jwt.decode(&token).await?.user_id;

    match invoices_service::get_invoice_by_id(&state, &invoice_id.into_inner(), &user_id).await {
        Ok(invoice) => {
            state.ddos.medium.remember(&delete_feedback_token).await?;
            Ok(HttpResponse::Ok().json(invoice))
        }
        Err(e) => Err(e),
    }
}

/// Configure Invoices Handlers
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            .service(
                web::resource("/")
                    // Get All Invoices
                    .route(
                        // Get All Invoices
                        web::get().to(all_invoices),
                    )
                    // Create Invoice
                    .route(web::post().to(create_invoice)),
            )
            // Invoice
            .service(
                web::scope("/invoice")
                    // Invoice
                    .service(
                        web::resource("")
                            // Create Invoice
                            .route(web::post().to(create_invoice)),
                    )
                    // Invoice {invoice_id}
                    .service(
                        web::resource("/{invoice_id}")
                            // Get Invoice By Id
                            .route(web::get().to(get_invoice_by_id))
                            // Delete Invoice
                            .route(web::delete().to(delete_invoice)),
                    ),
            ),
    );
}
