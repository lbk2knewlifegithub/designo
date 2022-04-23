use crate::{
    dto::invoice_dto::{CreateInvoiceDTO, UpdateInvoiceDTO},
    models::invoice_model::Invoice,
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
    let sender_address_id =
        address_repo::create_address(&trans, &create_invoice_dto.sender_address).await?;

    // Create Client Address
    let client_address_id =
        address_repo::create_address(&trans, &create_invoice_dto.client_address).await?;

    // Invoice Id
    let invoice_id = invoices_repo::create_invoice(
        &trans,
        user_id,
        &sender_address_id,
        &client_address_id,
        &create_invoice_dto,
    )
    .await?;

    // Create Items
    if let Some(items) = create_invoice_dto.to_owned().items {
        for item in items {
            items_repo::create_item(&trans, &invoice_id, &item).await?;
        }
    }

    let invoice = invoices_repo::get_invoice_by_id(&trans, user_id, &invoice_id).await?;

    // COMMIT TRANSACTION
    trans.commit().await?;

    match invoice {
        Some(invoice) => Ok(invoice),
        None => Err(AppError::RecordNotFound),
    }
}

/// Delete Invoice Service
pub async fn delete_invoice(
    state: &InvoiceAppState,
    user_id: &i32,
    invoice_id: &i32,
) -> Result<()> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;

    let affected = match invoices_repo::delete_invoice(&trans, user_id, invoice_id).await {
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
    let invoice = invoices_repo::get_invoice_by_id(&trans, user_id, invoice_id).await?;

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

/// Update Invoice Service
pub async fn update_invoice(
    state: &InvoiceAppState,
    invoice_id: &i32,
    user_id: &i32,
    update_invoice_dto: &UpdateInvoiceDTO,
) -> Result<Invoice> {
    // Connect to pool
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    // Update Sender Address
    let affected =
        address_repo::update_sender_address(&trans, invoice_id, &update_invoice_dto.sender_address)
            .await?;

    if affected == 0 {
        return Err(AppError::InvalidInput);
    }

    // Update Client Address
    let affected =
        address_repo::update_client_address(&trans, invoice_id, &update_invoice_dto.client_address)
            .await?;

    if affected == 0 {
        return Err(AppError::InvalidInput);
    }

    // Update Invoice
    let affected =
        invoices_repo::update_invoice(&trans, user_id, invoice_id, &update_invoice_dto).await?;
    if affected == 0 {
        return Err(AppError::InvalidInput);
    }

    let items_dto = update_invoice_dto.to_owned().items;

    // Create Items
    if let Some(added) = items_dto.added {
        for item in added {
            let affected = items_repo::create_item(&trans, invoice_id, &item).await?;

            if affected == 0 {
                return Err(AppError::InvalidInput);
            }
        }
    }

    // Delete Items
    if let Some(deleted) = items_dto.deleted {
        for item_id in deleted {
            let affected = items_repo::delete_item(&trans, invoice_id, &item_id).await?;
            if affected == 0 {
                return Err(AppError::InvalidInput);
            }
        }
    }

    // Update Items
    if let Some(updated) = items_dto.updated {
        for item in updated {
            let affected = items_repo::update_item(&trans, invoice_id, &item).await?;
            if affected == 0 {
                return Err(AppError::InvalidInput);
            }
        }
    }

    // Get Invoice After Updated
    let invoice = invoices_repo::get_invoice_by_id(&trans, user_id, &invoice_id).await?;

    // COMMIT TRANSACTION
    trans.commit().await?;

    match invoice {
        Some(invoice) => Ok(invoice),
        None => Err(AppError::RecordNotFound),
    }
}
