use crate::dto::item_dto::CreateItemDTO;
use prelude::{errors::AppError, Result};

use deadpool_postgres::Client;
use tracing::error;

/// Create Item
pub async fn create_item(
    client: &Client,
    invoice_id: &i32,
    create_item_dto: &CreateItemDTO,
) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
    INSERT INTO invoice_app.items(
        name, 
        quantity, 
        price, 
        invoice_id)
    VALUES($1, $2, $3, $4) RETURNING item_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_ITEM");

    let CreateItemDTO {
        name,
        quantity,
        price,
    } = create_item_dto;

    Ok(client
        .query(&stmt, &[name, quantity, price, invoice_id])
        .await
        .map_err(|e| {
            error!("{}", e);
            AppError::InvalidInput
        })?
        .iter()
        .map(|row| row.get("item_id"))
        .collect::<Vec<i32>>()
        .pop()
        .ok_or(AppError::IntervalServerError)?)
}
