use crate::models::category_model::Category;
use deadpool_postgres::Client;
use prelude::Result;
use tokio_pg_mapper::FromTokioPostgresRow;

/**
 *  - Get All Feedbacks
 */
pub async fn get_category_by_name(client: &Client, name: &str) -> Result<Option<Category>> {
    let stmt = client
        .prepare(
            &r#"
        SELECT 
           category_id, 
           name
        FROM categories
        WHERE name = $1;
        "#,
        )
        .await?;

    Ok(client
        .query(&stmt, &[&name])
        .await?
        .iter()
        .map(|row| Category::from_row_ref(row).unwrap())
        .collect::<Vec<Category>>()
        .pop())
}
