use crate::models::invoice_model::{DeleteInvoice, Invoice, NewInvoice};
use prelude::{errors::AppError, Result};

use deadpool_postgres::Transaction;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::{debug, error};

/// Get All Invoices
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
    invoice_id: &i32,
    user_id: &i32,
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

/// Create Invoice
pub async fn create_invoice(trans: &Transaction<'_>, new_invoice: &NewInvoice) -> Result<i32> {
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
    sender_address_id, 
    client_address_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING invoice_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_INVOICE");

    let NewInvoice {
        user_id,
        payment_terms,
        description,
        client_name,
        client_email,
        status,
        sender_address_id,
        client_address_id,
    } = new_invoice;

    Ok(trans
        .query(
            &stmt,
            &[
                user_id,
                payment_terms,
                description,
                client_name,
                client_email,
                status,
                sender_address_id,
                client_address_id,
            ],
        )
        .await
        .map_err(|e| {
            error!("{}", e);
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| row.get("invoice_id"))
        .collect::<Vec<i32>>()
        .pop()
        .ok_or(AppError::IntervalServerError)?)
}

/// Delete Invoice By Id
pub async fn delete_invoice(
    trans: &Transaction<'_>,
    delete_invoice: &DeleteInvoice,
) -> Result<u64> {
    let stmt = trans
        .prepare(&r#"DELETE FROM invoice_app.invoices WHERE invoice_id= $1 AND user_id = $2;"#)
        .await?;

    let DeleteInvoice {
        invoice_id,
        user_id,
    } = delete_invoice;

    let affected = trans
        .execute(&stmt, &[invoice_id, user_id])
        .await
        .map_err(|e| {
            debug!("delete_invoice REPO {e}");
            AppError::InvalidInput
        })?;
    Ok(affected)
}

/// Mask As Paid Invoice Repo
pub async fn mask_as_paid(trans: &Transaction<'_>, user_id: &i32, invoice_id: &i32) -> Result<u64> {
    let stmt = trans
        .prepare(&r#"UPDATE invoice_app.invoices SET status='paid' WHERE user_id = $1 AND invoice_id = $2;"#)
        .await?;

    let affected = trans
        .execute(&stmt, &[user_id, invoice_id])
        .await
        .map_err(|e| {
            debug!("mask_as_paid REPO {e}");
            AppError::InvalidInput
        })?;
    Ok(affected)
}
