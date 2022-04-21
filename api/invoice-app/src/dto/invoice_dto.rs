use super::address_dto::CreateAddressDTO;
use super::item_dto::CreateItemDTO;
use serde::Deserialize;
use validator::Validate;

#[derive(Clone, Deserialize, Validate)]
pub struct CreateInvoiceDTO {
    #[validate(length(min = 1, max = 250))]
    pub description: String,

    #[validate(length(min = 1, max = 50))]
    #[serde(rename(deserialize = "clientName"))]
    pub client_name: String,

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
