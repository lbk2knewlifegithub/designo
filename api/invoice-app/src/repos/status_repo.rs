use crate::models::status_model::Status;
use prelude::{errors::invoice_error::InvoiceError, Result};

use deadpool_postgres::Transaction;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::error;

/// Get Status By Name
pub async fn get_status_by_name<'a>(trans: &Transaction<'a>, name: &str) -> Result<Status> {
    let stmt = trans
        .prepare(
            &r#"
            SELECT 
                s.status_id,
                s.name
            FROM invoice_app.statuses s
            WHERE s.name = $1;"#,
        )
        .await
        .expect("Error preparing statement GET_STATUS_BY_NAME");

    match trans.query_one(&stmt, &[&name]).await {
        Ok(row) => Ok(Status::from_row_ref(&row)
            .expect("GET_STATUS_BY_NAME REPO Error When converting row to Status")),
        Err(e) => {
            error!("GET_STATUS_BY_NAME REPO Error: {}", e);
            Err(InvoiceError::StatusNotFound(name.to_string()).into())
        }
    }
}
