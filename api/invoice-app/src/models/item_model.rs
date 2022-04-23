use serde_derive::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, PostgresMapper, Serialize, Deserialize)]
#[pg_mapper(table = "items")]
pub struct Item {
    pub item_id: i32,
    pub name: String,
    pub quantity: i32,
    pub price: f32,
}
