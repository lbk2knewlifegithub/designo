use super::{
    address_dto::{CreateAddressDTO, UpdateAddressDTO},
    item_dto::{CreateItemDTO, UpdateItemDTO},
};
use crate::validators::{payment_terms_validate, status_validate};
use chrono::NaiveDateTime;
use prelude::utils::date_format::date_format;
use serde::Deserialize;
use validator::Validate;

#[derive(Clone, Deserialize, Validate)]
pub struct CreateInvoiceDTO {
    #[validate(length(min = 1, max = 250))]
    pub description: String,

    #[validate(length(min = 1, max = 50))]
    #[serde(rename(deserialize = "clientName"))]
    pub client_name: String,

    #[serde(with = "date_format")]
    #[serde(rename(deserialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[validate(length(min = 1, max = 100))]
    #[serde(rename(deserialize = "clientEmail"))]
    pub client_email: String,

    #[serde(rename(deserialize = "paymentTerms"))]
    #[validate(custom(function = "payment_terms_validate"))]
    pub payment_terms: i32,

    #[validate(custom(function = "status_validate"))]
    pub status: String,

    #[serde(rename(deserialize = "senderAddress"))]
    pub sender_address: CreateAddressDTO,

    #[serde(rename(deserialize = "clientAddress"))]
    pub client_address: CreateAddressDTO,

    pub items: Option<Vec<CreateItemDTO>>,
}

#[derive(Clone, Deserialize, Validate)]
pub struct UpdateInvoiceDTO {
    #[validate(length(min = 1, max = 250))]
    pub description: String,

    #[validate(length(min = 1, max = 50))]
    #[serde(rename(deserialize = "clientName"))]
    pub client_name: String,

    #[serde(with = "date_format")]
    #[serde(rename(deserialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[validate(length(min = 1, max = 100))]
    #[serde(rename(deserialize = "clientEmail"))]
    pub client_email: String,

    #[serde(rename(deserialize = "paymentTerms"))]
    #[validate(custom(function = "payment_terms_validate"))]
    pub payment_terms: i32,

    #[validate(length(min = 1, max = 20))]
    #[validate(custom(function = "status_validate"))]
    pub status: String,

    #[serde(rename(deserialize = "senderAddress"))]
    pub sender_address: UpdateAddressDTO,

    #[serde(rename(deserialize = "clientAddress"))]
    pub client_address: UpdateAddressDTO,

    pub items: ItemsDTO,
}

#[derive(Clone, Deserialize, Validate)]
pub struct ItemsDTO {
    pub deleted: Option<Vec<i32>>,
    pub added: Option<Vec<CreateItemDTO>>,
    pub updated: Option<Vec<UpdateItemDTO>>,
}
