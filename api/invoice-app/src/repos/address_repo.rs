use crate::dto::address_dto::{CreateAddressDTO, UpdateAddressDTO};
use prelude::{errors::AppError, Result};

use deadpool_postgres::Transaction;

/// Create Address  
pub async fn create_address(
    trans: &Transaction<'_>,
    create_address_dto: &CreateAddressDTO,
) -> Result<i32> {
    let stmt = trans
        .prepare(
            &r#"
                INSERT INTO invoice_app.address(
                    street, 
                    post_code, 
                    country,
                    city)
                VALUES($1, $2, $3, $4) RETURNING address_id;"#,
        )
        .await
        .expect("Error preparing statement INVOICE_APP.CREATE_ADDRESS");

    let CreateAddressDTO {
        street,
        post_code,
        country,
        city,
    } = create_address_dto;

    match trans
        .query_one(&stmt, &[street, post_code, country, city])
        .await
    {
        Ok(row) => Ok(row.get(0)),
        Err(_) => Err(AppError::IntervalServerError),
    }
}

/// Update Sender Address
pub async fn update_sender_address(
    trans: &Transaction<'_>,
    invoice_id: &i32,
    update_address_dto: &UpdateAddressDTO,
) -> Result<u64> {
    Ok(update_address(&trans, "sender_address_id", invoice_id, update_address_dto).await?)
}

/// Update Client Address
pub async fn update_client_address(
    trans: &Transaction<'_>,
    invoice_id: &i32,
    update_address_dto: &UpdateAddressDTO,
) -> Result<u64> {
    Ok(update_address(trans, "client_address_id", invoice_id, update_address_dto).await?)
}

/// Update Address
async fn update_address(
    trans: &Transaction<'_>,
    address: &str,
    invoice_id: &i32,
    update_address_dto: &UpdateAddressDTO,
) -> Result<u64> {
    let stmt = trans
        .prepare(
            format!(
                "
                UPDATE invoice_app.address
                SET 
                    street = $1,
                    post_code = $2,
                    country = $3,
                    city = $4
                WHERE address_id = $5 AND address_id = (SELECT {} FROM invoice_app.invoices WHERE invoice_id = $6);",
                address
            )
            .as_str(),
        )
        .await
        .expect("Error preparing statement INVOICE_APP.UPDATE_ADDRESS");

    let UpdateAddressDTO {
        address_id,
        street,
        post_code,
        country,
        city,
    } = update_address_dto;

    let affected = trans
        .execute(
            &stmt,
            &[street, post_code, country, city, address_id, invoice_id],
        )
        .await
        .map_err(|_| AppError::InvalidInput)?;

    Ok(affected)
}
