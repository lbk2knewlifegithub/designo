use crate::models::invoice_model::{DeleteInvoice, Invoice, NewInvoice};
use prelude::{errors::AppError, Result};

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::{debug, error};

/// Get All Invoices
pub async fn all_invoices(client: &Client, user_id: &i32) -> Result<Vec<Invoice>> {
    let stmt = client
        .prepare(
            &r#"
            SELECT 
                invoice_id,
                created_at,
                pt.days AS payment_terms,
                description, 
                client_name, 
                client_email,
                 (SELECT json_agg(row) FROM (SELECT * FROM invoice_app.items i WHERE i.invoice_id = iov.invoice_id) AS row) AS items,
                s.name AS status,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.sender_address_id) AS row) AS sender_address,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.client_address_id) AS row) AS client_address
            FROM invoice_app.invoices iov
            JOIN invoice_app.statuses s USING(status_id)
            JOIN invoice_app.payment_terms pt USING(payment_terms_id)
            WHERE iov.user_id = $1;
            "#,
        )
        .await.expect("Error preparing statement GET_ALL_INVOICES");

    Ok(client
        .query(&stmt, &[&user_id])
        .await?
        .iter()
        .map(|row| Invoice::from_row_ref(row).unwrap())
        .collect::<Vec<Invoice>>())
}

/// Get Invoice By Id
pub async fn get_invoice_by_id(
    client: &Client,
    invoice_id: &i32,
    user_id: &i32,
) -> Result<Invoice> {
    let stmt = client
        .prepare(
            &r#"
            SELECT 
                invoice_id,
                created_at,
                pt.days AS payment_terms,
                description, 
                client_name, 
                client_email,
                 (SELECT json_agg(row) FROM (SELECT * FROM invoice_app.items i WHERE i.invoice_id = iov.invoice_id) AS row) AS items,
                s.name AS status,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.sender_address_id) AS row) AS sender_address,
                (SELECT row_to_json(row) FROM (SELECT * FROM invoice_app.address a WHERE a.address_id = iov.client_address_id) AS row) AS client_address
            FROM invoice_app.invoices iov
            JOIN invoice_app.statuses s USING(status_id)
            JOIN invoice_app.payment_terms pt USING(payment_terms_id)
            WHERE iov.invoice_id = $1 AND iov.user_id = $2;"#,
        )
        .await.expect("Error preparing statement GET_INVOICE_BY_ID");

    let row = client.query_one(&stmt, &[invoice_id, user_id]).await?;
    let invoice = Invoice::from_row_ref(&row).unwrap();
    Ok(invoice)
}

/// Create Invoice
pub async fn create_invoice(client: &Client, new_invoice: &NewInvoice) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
INSERT INTO invoice_app.invoices(
    user_id,
    payment_terms_id, 
    description, 
    client_name,
    client_email, 
    status_id, 
    sender_address_id, 
    client_address_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING invoice_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_INVOICE");

    let NewInvoice {
        user_id,
        payment_terms_id,
        description,
        client_name,
        client_email,
        status_id,
        sender_address_id,
        client_address_id,
    } = new_invoice;

    Ok(client
        .query(
            &stmt,
            &[
                user_id,
                payment_terms_id,
                description,
                client_name,
                client_email,
                status_id,
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
pub async fn delete_invoice(client: &Client, delete_invoice: &DeleteInvoice) -> Result<u64> {
    let stmt = client
        .prepare(&r#"DELETE FROM invoice_app.invoices WHERE invoice_id= $1 AND user_id = $2;"#)
        .await
        .expect("Error preparing statement DELETE_INVOICE");

    let DeleteInvoice {
        invoice_id,
        user_id,
    } = delete_invoice;

    let affected = client
        .execute(&stmt, &[invoice_id, user_id])
        .await
        .map_err(|e| {
            debug!("DELETE_INVOICE REPO {e}");
            AppError::InvalidInput
        })?;
    Ok(affected)
}
