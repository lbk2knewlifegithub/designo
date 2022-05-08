use crate::{
    dto::item_dto::{CreateItemDTO, UpdateItemDTO},
    errors::item_error::ItemError,
};
use deadpool_postgres::Transaction;
use prelude::{errors::AppError, Result};
use tracing::{debug, error};

/// Create Item
pub async fn create_item(
    trans: &Transaction<'_>,
    invoice_id: &i32,
    create_item_dto: &CreateItemDTO,
) -> Result<i32> {
    let stmt = trans
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

    Ok(trans
        .query(&stmt, &[name, quantity, price, invoice_id])
        .await
        .map_err(|e| {
            debug!("{}", e);
            ItemError::InvalidItem
        })?
        .iter()
        .map(|row| row.get(0))
        .collect::<Vec<i32>>()
        .pop()
        .ok_or(AppError::internal_server_error())?)
}

/// Delete Item Repo
pub async fn delete_item(trans: &Transaction<'_>, invoice_id: &i32, item_id: &i32) -> Result<u64> {
    let stmt = trans
        .prepare(
            &r#"
        DELETE FROM 
            invoice_app.items 
        WHERE item_id = $1 AND invoice_id = $2;"#,
        )
        .await
        .expect("Error preparing statement DELETE_ITEM");

    let affected = trans
        .execute(&stmt, &[item_id, &invoice_id])
        .await
        .map_err(|e| {
            error!("delete_item REPO {e}");
            ItemError::InvalidItem
        })?;
    Ok(affected)
}

/// Update Item
pub async fn update_item(
    client: &Transaction<'_>,
    invoice_id: &i32,
    update_item_dto: &UpdateItemDTO,
) -> Result<u64> {
    let stmt = client
        .prepare(
            &r#"
        UPDATE invoice_app.items 
        SET name = $1,
            quantity = $2,
            price = $3
        WHERE item_id = $4 AND invoice_id = $5;"#,
        )
        .await?;

    let UpdateItemDTO {
        name,
        quantity,
        price,
        item_id,
    } = update_item_dto;

    let affected = client
        .execute(&stmt, &[name, quantity, price, item_id, invoice_id])
        .await
        .map_err(|e| {
            error!("update_item REPO {e}");
            ItemError::InvalidItem
        })?;

    Ok(affected)
}
