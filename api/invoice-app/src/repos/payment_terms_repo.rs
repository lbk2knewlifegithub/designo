use crate::models::payment_terms_model::PaymentTerms;
use prelude::{errors::invoice_error::InvoiceError, Result};

use deadpool_postgres::Transaction;
use tokio_pg_mapper::FromTokioPostgresRow;
use tracing::error;

/// Get Payment Terms By Days
pub async fn get_payment_terms_by_days(
    trans: &Transaction<'_>,
    days: &i32,
) -> Result<PaymentTerms> {
    let stmt = trans
        .prepare(
            &r#"
            SELECT 
                pt.payment_terms_id,
                pt.days
            FROM invoice_app.payment_terms pt
            WHERE pt.days = $1;"#,
        )
        .await
        .expect("Error preparing statement GET_PAYMENT_TERMS_BY_DAYS");

    match trans.query_one(&stmt, &[days]).await {
        Ok(row) => Ok(PaymentTerms::from_row_ref(&row)
            .expect("GET_PAYMENT_TERMS_BY_DAYS REPO Error When converting row to PaymentTerms")),
        Err(e) => {
            error!("GET_PAYMENT_TERMS_BY_DAYS REPO Error: {}", e);
            Err(InvoiceError::PaymentTermsNotFound(days.to_owned()).into())
        }
    }
}
