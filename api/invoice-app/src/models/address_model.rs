use postgres_types::FromSql;
use serde_derive::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use tracing::error;

#[derive(Debug, PostgresMapper, Serialize, Deserialize)]
#[pg_mapper(table = "address")]
pub struct Address {
    pub address_id: i32,
    pub street: String,
    #[serde(rename(serialize = "postCode"))]
    pub post_code: String,
    pub country: String,
}

impl<'a> FromSql<'a> for Address {
    fn from_sql(
        _ty: &postgres_types::Type,
        raw: &'a [u8],
    ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
        let s = match std::str::from_utf8(raw) {
            Ok(v) => v,
            Err(e) => {
                error!("InvoiceApp Address: Invalid UTF-8 sequence: {}", e);
                return Err(Box::new(e));
            }
        };

        let user = match serde_json::from_str(&s) {
            Ok(v) => v,
            Err(e) => {
                error!("InvoiceApp-App: Invalid JSON: {}", e);
                return Err(Box::new(e));
            }
        };

        Ok(user)
    }

    fn accepts(ty: &postgres_types::Type) -> bool {
        if ty == &postgres_types::Type::JSON {
            return true;
        }
        false
    }
}
