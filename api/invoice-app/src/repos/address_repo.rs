use crate::dto::address_dto::CreateAddressDTO;
use prelude::Result;

use deadpool_postgres::Client;
use prelude::errors::AppError;

/// Create Address  
pub async fn crate_address(client: &Client, create_address_dto: &CreateAddressDTO) -> Result<i32> {
    let stmt = client
        .prepare(
            &r#"
                INSERT INTO invoice_app.address(
                    street, 
                    post_code, 
                    country)
                VALUES($1, $2, $3) RETURNING address_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_INVOICE");

    let CreateAddressDTO {
        street,
        post_code,
        country,
    } = create_address_dto;

    Ok(client
        .query(&stmt, &[street, post_code, country])
        .await
        .expect("Error creating address")
        .iter()
        .map(|row| row.get("address_id"))
        .collect::<Vec<i32>>()
        .pop()
        .ok_or(AppError::IntervalServerError)?)
}
