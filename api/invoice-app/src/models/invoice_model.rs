use super::{address_model::Address, item_model::Item};
use chrono::NaiveDateTime;
use postgres_types::FromSql;
use serde_derive::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use tracing::{debug, error};

#[derive(Debug, PostgresMapper, Serialize)]
#[pg_mapper(table = "invoices")]
pub struct Invoice {
    pub invoice_id: i32,

    #[serde(rename(serialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[serde(rename(serialize = "paymentTerms"))]
    pub payment_terms: i32,

    pub description: String,

    #[serde(rename(serialize = "clientName"))]
    pub client_name: String,

    #[serde(rename(serialize = "clientEmail"))]
    pub client_email: String,

    pub status: String,

    #[serde(rename(serialize = "senderAddress"))]
    pub sender_address: Address,

    #[serde(rename(serialize = "clientAddress"))]
    pub client_address: Address,

    pub items: Option<Items>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Items(Vec<Item>);

impl<'a> FromSql<'a> for Items {
    fn from_sql(
        _ty: &postgres_types::Type,
        raw: &'a [u8],
    ) -> Result<Self, Box<dyn std::error::Error + Sync + Send>> {
        let s = match std::str::from_utf8(raw) {
            Ok(v) => v,
            Err(e) => {
                error!("InvoiceApp Items: Invalid UTF-8 sequence: {}", e);
                return Err(Box::new(e));
            }
        };

        debug!("InvoiceApp Items: {}", s);

        let items: Vec<Item> = match serde_json::from_str(s) {
            Ok(v) => v,
            Err(e) => {
                error!("InvoiceApp App: Invalid JSON: {}", e);
                return Err(Box::new(e));
            }
        };

        Ok(Items(items))
    }

    fn accepts(ty: &postgres_types::Type) -> bool {
        if ty == &postgres_types::Type::JSON {
            return true;
        }
        false
    }
}

/// New Invoice
pub struct NewInvoice {
    pub user_id: i32,
    pub payment_terms_id: i32,
    pub description: String,
    pub client_name: String,
    pub client_email: String,
    pub status_id: i32,
    pub sender_address_id: i32,
    pub client_address_id: i32,
}

pub struct DeleteInvoice {
    pub invoice_id: i32,
    pub user_id: i32,
}

impl DeleteInvoice {
    pub fn new(invoice_id: i32, user_id: i32) -> Self {
        Self {
            invoice_id,
            user_id,
        }
    }
}
