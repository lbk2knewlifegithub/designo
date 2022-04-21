use crate::dto::address_dto::CreateAddressDTO;
use prelude::Result;

use deadpool_postgres::Transaction;
use prelude::errors::AppError;

/// Create Address  
pub async fn crate_address<'a>(
    trans: &Transaction<'a>,
    create_address_dto: &CreateAddressDTO,
) -> Result<i32> {
    let stmt = trans
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

    match trans.query_one(&stmt, &[street, post_code, country]).await {
        Ok(row) => Ok(row.get::<'_, _, i32>("address_id")),
        Err(_) => Err(AppError::IntervalServerError),
    }
}
