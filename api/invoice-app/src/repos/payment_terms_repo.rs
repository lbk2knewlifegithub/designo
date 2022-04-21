use crate::models::payment_terms_model::PaymentTerms;
use prelude::Result;

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;

/// Get Payment Terms By Days
pub async fn get_payment_terms_by_days(
    client: &Client,
    days: &i32,
) -> Result<Option<PaymentTerms>> {
    let stmt = client
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

    Ok(client
        .query(&stmt, &[days])
        .await?
        .iter()
        .map(|row| PaymentTerms::from_row_ref(row).unwrap())
        .collect::<Vec<PaymentTerms>>()
        .pop())
}
