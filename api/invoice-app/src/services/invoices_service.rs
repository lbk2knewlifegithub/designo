use crate::{
    dto::invoice_dto::CreateInvoiceDTO,
    models::invoice_model::{DeleteInvoice, Invoice, NewInvoice},
    repos::{address_repo, invoices_repo, items_repo, payment_terms_repo, status_repo},
    InvoiceAppState,
};
use prelude::{
    errors::{invoice_error::InvoiceError, AppError},
    Result,
};

///  All Invoice Service
pub async fn all_invoices(state: &InvoiceAppState, user_id: &i32) -> Result<Vec<Invoice>> {
    let client = state.db.pool.get().await?;
    Ok(invoices_repo::all_invoices(&client, user_id).await?)
}

/// Create Invoice Service
pub async fn create_invoice(
    state: &InvoiceAppState,
    user_id: &i32,
    create_invoice_dto: &CreateInvoiceDTO,
) -> Result<Invoice> {
    // Connect to pool
    let client = state.db.pool.get().await?;

    // Check PaymentTerms Exists
    let payment_terms = match payment_terms_repo::get_payment_terms_by_days(
        &client,
        &create_invoice_dto.payment_terms,
    )
    .await?
    {
        Some(category) => category,
        None => {
            return Err(InvoiceError::PaymentTermsNotFound(create_invoice_dto.payment_terms).into())
        }
    };

    // Check InvoiceStatus Exists
    let status = match status_repo::get_status_by_name(&client, &create_invoice_dto.status).await? {
        Some(status) => status,
        None => {
            return Err(InvoiceError::StatusNotFound(create_invoice_dto.status.to_owned()).into())
        }
    };

    // Create Sender Address
    let sender_address_id = address_repo::crate_address(
        &client,
        &create_invoice_dto.sender_address.to_owned().unwrap(),
    )
    .await?;

    // Create Client Address
    let client_address_id = address_repo::crate_address(
        &client,
        &create_invoice_dto.client_address.to_owned().unwrap(),
    )
    .await?;

    let new_invoice = NewInvoice {
        user_id: user_id.to_owned(),
        sender_address_id,
        client_address_id,
        payment_terms_id: payment_terms.payment_terms_id,
        status_id: status.status_id,
        description: create_invoice_dto.description.to_owned(),
        client_name: create_invoice_dto.client_name.to_owned(),
        client_email: create_invoice_dto.client_email.to_owned(),
    };

    let invoice_id = invoices_repo::create_invoice(&client, &new_invoice).await?;

    // Create Items
    if let Some(items) = create_invoice_dto.to_owned().items {
        for item in items {
            items_repo::create_item(&client, &invoice_id, &item).await?;
        }
    }

    Ok(invoices_repo::get_invoice_by_id(&client, &invoice_id, user_id).await?)
}

/// Delete Invoice Service
pub async fn delete_invoice(state: &InvoiceAppState, delete_invoice: &DeleteInvoice) -> Result<()> {
    let client = state.db.pool.get().await?;

    let affected = invoices_repo::delete_invoice(&client, &delete_invoice).await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}
