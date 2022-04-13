use crate::models::status_model::Status;
use prelude::Result;

use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;

/**
 *  - Get Status By Name
 */
pub async fn get_status_by_name(client: &Client, name: &str) -> Result<Option<Status>> {
    let stmt = client
        .prepare(
            &r#"
        SELECT 
           status_id, 
           name
        FROM statuses
        WHERE name = $1;
        "#,
        )
        .await?;

    Ok(client
        .query(&stmt, &[&name])
        .await?
        .iter()
        .map(|row| Status::from_row_ref(row).unwrap())
        .collect::<Vec<Status>>()
        .pop())
}
