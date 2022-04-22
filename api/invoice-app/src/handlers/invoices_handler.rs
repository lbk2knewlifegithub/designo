use crate::{
    dto::invoice_dto::CreateInvoiceDTO,
    models::{invoice_model::DeleteInvoice, random_invoice_model::RandomInvoice},
    services::invoices_service,
    InvoiceAppState,
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

/// Random Invoice
async fn random_invoice(
    state: web::Data<InvoiceAppState>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    if let Some(val) = req.peer_addr() {
        let random_invoice_token = format!("random_invoice:{}", val.ip());
        state.ddos.check(&random_invoice_token).await?;
        state.ddos.remember(&random_invoice_token, 1).await?;
    }

    let random_invoice = RandomInvoice::random();
    Ok(HttpResponse::Ok().json(random_invoice))
}

/// Create Invoice Router
async fn create_invoice(
    state: web::Data<InvoiceAppState>,
    create_invoice_dto: Json<CreateInvoiceDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let create_key = format!("createinvoice:{}", token);

    state.ddos.check(&create_key).await?;

    let user_id = state.jwt.decode(&token).await?.user_id;

    match invoices_service::create_invoice(&state, &user_id, &create_invoice_dto.into_inner()).await
    {
        Ok(invoice) => {
            state.ddos.remember(&create_key, 5).await?;
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
    let delete_feedback_token = format!("invoice_app:delete_invoice:{}", token);

    // Check DDos
    state.ddos.check(&delete_feedback_token).await?;

    // Decode Token
    let user_token = state.jwt.decode(&token).await?;

    let delete_invoice = DeleteInvoice::new(invoice_id.into_inner(), user_token.user_id);

    match invoices_service::delete_invoice(&state, &delete_invoice).await {
        Ok(_) => {
            state.ddos.remember(&delete_feedback_token, 3).await?;
            Ok(HttpResponse::NoContent().finish())
        }
        Err(e) => Err(e),
    }
}

/// Mask As Paid Invoice Handler
async fn mask_as_paid(
    state: web::Data<InvoiceAppState>,
    invoice_id: Path<i32>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    let token = state.jwt.get_token(&req)?;
    let mask_as_paid_token = format!("invoice_app:mask_as_paid:{}", token);

    // Check DDos
    state.ddos.check(&mask_as_paid_token).await?;

    // Decode Token
    let user_id = state.jwt.decode(&token).await?.user_id;

    match invoices_service::mask_as_paid(&state, &user_id, &invoice_id.into_inner()).await {
        Ok(_) => {
            state.ddos.remember(&mask_as_paid_token, 3).await?;
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
    state.ddos.check(&delete_feedback_token).await?;

    // Decode Token
    let user_id = state.jwt.decode(&token).await?.user_id;

    match invoices_service::get_invoice_by_id(&state, &invoice_id.into_inner(), &user_id).await {
        Ok(invoice) => {
            state.ddos.remember(&delete_feedback_token, 2).await?;
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
                        web::scope("/{invoice_id}")
                            // Invoice {invoice_id}
                            .service(
                                web::resource("")
                                    // Get Invoice By Id
                                    .route(web::get().to(get_invoice_by_id))
                                    // Delete Invoice
                                    .route(web::delete().to(delete_invoice)),
                            )
                            .service(
                                web::resource("/mask-as-paid")
                                    // Mask As Paid
                                    .route(web::patch().to(mask_as_paid)),
                            ),
                    ),
            )
            // Random Invoice
            .service(
                web::scope("/random")
                    // Random Invoice
                    .service(
                        web::resource("")
                            // Random Invoice
                            .route(web::get().to(random_invoice)),
                    ),
            ),
    );
}
