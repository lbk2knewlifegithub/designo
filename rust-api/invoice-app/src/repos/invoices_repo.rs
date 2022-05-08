use crate::{
    dto::invoice_dto::{CreateInvoiceDTO, UpdateInvoiceDTO},
    errors::invoice_error::InvoiceError,
    models::invoice_model::Invoice,
};
use prelude::{errors::AppError, Result};

use deadpool_postgres::Transaction;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::{debug, error};

/// Get All Invoices REPO
pub async fn all_invoices(trans: &Transaction<'_>, user_id: &i32) -> Result<Vec<Invoice>> {
    let stmt = trans
        .prepare(
            &r#"
            SELECT 
                invoice_id,
                created_at,
                payment_terms,
                description, 
                client_name, 
                client_email,
                 (SELECT json_agg(row) FROM (SELECT * FROM invoice_app.items i WHERE i.invoice_id = iov.invoice_id) AS row) AS items,
                status,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.sender_address_id) AS row) AS sender_address,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.client_address_id) AS row) AS client_address
            FROM invoice_app.invoices iov
            WHERE iov.user_id = $1;
            "#,
        )
        .await.expect("Error preparing statement GET_ALL_INVOICES");

    Ok(trans
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| Invoice::from_row_ref(row).unwrap())
        .collect::<Vec<Invoice>>())
}

/// Get Invoice By Id
pub async fn get_invoice_by_id(
    trans: &Transaction<'_>,
    user_id: &i32,
    invoice_id: &i32,
) -> Result<Option<Invoice>> {
    let stmt = trans
        .prepare(
            &r#"
            SELECT 
                invoice_id,
                created_at,
                payment_terms,
                description, 
                client_name, 
                client_email,
                 (SELECT json_agg(row) FROM (SELECT * FROM invoice_app.items i WHERE i.invoice_id = iov.invoice_id) AS row) AS items,
                status,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.sender_address_id) AS row) AS sender_address,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.client_address_id) AS row) AS client_address
            FROM invoice_app.invoices iov
            WHERE iov.invoice_id = $1 AND iov.user_id = $2;"#,
        )
        .await.expect("Error preparing statement GET_INVOICE_BY_ID");

    match trans.query_one(&stmt, &[&invoice_id, &user_id]).await {
        Ok(row) => Ok(Some(Invoice::from_row_ref(&row).expect(
            "GET_INVOICE_BY_ID REPO Error When converting row to Invoice",
        ))),
        Err(e) => {
            error!("GET_INVOICE_BY_ID REPO  {e}");
            Ok(None)
        }
    }
}

/// Delete Invoice REPO
pub async fn delete_invoice(
    trans: &Transaction<'_>,
    user_id: &i32,
    invoice_id: &i32,
) -> Result<u64> {
    let stmt = trans
        .prepare(&r#"DELETE FROM invoice_app.invoices WHERE invoice_id= $1 AND user_id = $2;"#)
        .await?;

    let affected = trans
        .execute(&stmt, &[invoice_id, user_id])
        .await
        .map_err(|e| {
            debug!("delete_invoice REPO {e}");
            InvoiceError::InvalidInvoice("user_id not exist")
        })?;
    Ok(affected)
}

/// Mask As Paid REPO
pub async fn mask_as_paid(trans: &Transaction<'_>, user_id: &i32, invoice_id: &i32) -> Result<u64> {
    let stmt = trans
        .prepare(&r#"UPDATE invoice_app.invoices SET status='paid' WHERE user_id = $1 AND invoice_id = $2;"#)
        .await?;

    let affected = trans
        .execute(&stmt, &[user_id, invoice_id])
        .await
        .map_err(|e| {
            debug!("mask_as_paid REPO {e}");
            InvoiceError::InvalidInvoice("user_id not exist")
        })?;
    Ok(affected)
}

/// Create Invoice REPO
pub async fn create_invoice(
    trans: &Transaction<'_>,
    user_id: &i32,
    sender_address_id: &i32,
    client_address_id: &i32,
    create_invoice_dto: &CreateInvoiceDTO,
) -> Result<i32> {
    let stmt = trans
        .prepare(
            &r#"
                INSERT INTO invoice_app.invoices(
                    user_id,
                    payment_terms, 
                    description, 
                    client_name,
                    client_email, 
                    status, 
                    created_at,
                    sender_address_id, 
                    client_address_id)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING invoice_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_INVOICE");

    match trans
        .query_one(
            &stmt,
            &[
                user_id,
                &create_invoice_dto.payment_terms,
                &create_invoice_dto.description,
                &create_invoice_dto.client_name,
                &create_invoice_dto.client_email,
                &create_invoice_dto.status,
                &create_invoice_dto.created_at,
                sender_address_id,
                client_address_id,
            ],
        )
        .await
    {
        Ok(row) => Ok(row.get(0)),
        Err(_) => Err(AppError::internal_server_error()),
    }
}

/// Update Invoice REPO
pub async fn update_invoice(
    trans: &Transaction<'_>,
    user_id: &i32,
    invoice_id: &i32,
    update_invoice_dto: &UpdateInvoiceDTO,
) -> Result<u64> {
    let stmt = trans
        .prepare(
            &r#"
                UPDATE invoice_app.invoices
                SET
                    payment_terms = $1, 
                    description = $2, 
                    client_name = $3,
                    client_email = $4, 
                    status = $5, 
                    created_at = $6
                WHERE invoice_id = $7 AND user_id = $8;"#,
        )
        .await
        .expect("Error preparing statement UPDATE_INVOICE");

    let affected = trans
        .execute(
            &stmt,
            &[
                &update_invoice_dto.payment_terms,
                &update_invoice_dto.description,
                &update_invoice_dto.client_name,
                &update_invoice_dto.client_email,
                &update_invoice_dto.status,
                &update_invoice_dto.created_at,
                invoice_id,
                user_id,
            ],
        )
        .await
        .map_err(|e| {
            debug!("Update invoice error {}", e);
            InvoiceError::InvalidInvoice("")
        })?;

    Ok(affected)
}
