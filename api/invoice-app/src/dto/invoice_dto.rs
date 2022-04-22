use super::address_dto::CreateAddressDTO;
use super::item_dto::CreateItemDTO;
use chrono::NaiveDateTime;
use serde::Deserialize;
use validator::Validate;

#[derive(Clone, Deserialize, Validate)]
pub struct CreateInvoiceDTO {
    #[validate(length(min = 1, max = 250))]
    pub description: String,

    #[validate(length(min = 1, max = 50))]
    #[serde(rename(deserialize = "clientName"))]
    pub client_name: String,

    #[serde(with = "my_date_format")]
    #[serde(rename(deserialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[validate(length(min = 1, max = 100))]
    #[serde(rename(deserialize = "clientEmail"))]
    pub client_email: String,

    #[validate(range(min = 1, max = 1000))]
    #[serde(rename(deserialize = "paymentTerms"))]
    pub payment_terms: i32,

    #[validate(length(min = 1, max = 20))]
    pub status: String,

    #[validate(required)]
    #[serde(rename(deserialize = "senderAddress"))]
    pub sender_address: Option<CreateAddressDTO>,

    #[validate(required)]
    #[serde(rename(deserialize = "clientAddress"))]
    pub client_address: Option<CreateAddressDTO>,

    pub items: Option<Vec<CreateItemDTO>>,
}

mod my_date_format {
    use chrono::NaiveDateTime;
    use serde::{self, Deserialize, Deserializer, Serializer};
    use tracing::error;

    const FORMAT: &'static str = "%Y-%m-%dT%H:%M:%S%Z";

    pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        match NaiveDateTime::parse_from_str(&s, FORMAT) {
            Ok(date) => Ok(date),
            Err(e) => {
                error!("InvoiceApp CreateInvoiceDTO: Invalid date: {}", e);
                Err(serde::de::Error::custom("Invalid date"))
            }
        }
    }
}
