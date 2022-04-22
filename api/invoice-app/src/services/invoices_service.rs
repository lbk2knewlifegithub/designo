use crate::{
    dto::invoice_dto::CreateInvoiceDTO,
    models::invoice_model::{DeleteInvoice, Invoice, NewInvoice},
    repos::{address_repo, invoices_repo, items_repo},
    InvoiceAppState,
};
use prelude::{errors::AppError, Result};

///  All Invoice Service
pub async fn all_invoices(state: &InvoiceAppState, user_id: &i32) -> Result<Vec<Invoice>> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;
    Ok(invoices_repo::all_invoices(&trans, user_id).await?)
}

/// Create Invoice Service
pub async fn create_invoice(
    state: &InvoiceAppState,
    user_id: &i32,
    create_invoice_dto: &CreateInvoiceDTO,
) -> Result<Invoice> {
    // Connect to pool
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    // Create Sender Address
    let sender_address_id = address_repo::crate_address(
        &trans,
        &create_invoice_dto.sender_address.to_owned().unwrap(),
    )
    .await?;

    // Create Client Address
    let client_address_id = address_repo::crate_address(
        &trans,
        &create_invoice_dto.client_address.to_owned().unwrap(),
    )
    .await?;

    let new_invoice = NewInvoice {
        user_id: user_id.to_owned(),
        sender_address_id,
        client_address_id,
        payment_terms: create_invoice_dto.payment_terms,
        status: create_invoice_dto.status.to_owned(),
        description: create_invoice_dto.description.to_owned(),
        client_name: create_invoice_dto.client_name.to_owned(),
        client_email: create_invoice_dto.client_email.to_owned(),
    };

    let invoice_id = invoices_repo::create_invoice(&trans, &new_invoice).await?;

    // Create Items
    if let Some(items) = create_invoice_dto.to_owned().items {
        for item in items {
            items_repo::create_item(&trans, &invoice_id, &item).await?;
        }
    }

    let invoice = invoices_repo::get_invoice_by_id(&trans, &invoice_id, user_id).await?;

    // COMMIT TRANSACTION
    trans.commit().await?;

    match invoice {
        Some(invoice) => Ok(invoice),
        None => Err(AppError::RecordNotFound),
    }
}

/// Delete Invoice Service
pub async fn delete_invoice(state: &InvoiceAppState, delete_invoice: &DeleteInvoice) -> Result<()> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;

    let affected = match invoices_repo::delete_invoice(&trans, &delete_invoice).await {
        Ok(a) => a,
        Err(e) => {
            trans.rollback().await?;
            return Err(e);
        }
    };

    trans.commit().await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}

/// Get Invoice by Id Service
pub async fn get_invoice_by_id(
    state: &InvoiceAppState,
    invoice_id: &i32,
    user_id: &i32,
) -> Result<Invoice> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;
    let invoice = invoices_repo::get_invoice_by_id(&trans, invoice_id, user_id).await?;

    match invoice {
        Some(invoice) => Ok(invoice),
        None => Err(AppError::RecordNotFound),
    }
}

/// Mask As Paid Invoice Service
pub async fn mask_as_paid(state: &InvoiceAppState, user_id: &i32, invoice_id: &i32) -> Result<()> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;

    let affected = match invoices_repo::mask_as_paid(&trans, user_id, invoice_id).await {
        Ok(a) => a,
        Err(e) => {
            trans.rollback().await?;
            return Err(e);
        }
    };

    trans.commit().await?;

    if affected != 1 {
        return Err(AppError::RecordNotFound);
    }

    Ok(())
}
