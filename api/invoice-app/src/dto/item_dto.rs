use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Clone, Deserialize, Serialize, Validate)]
pub struct CreateItemDTO {
    #[validate(length(min = 1, max = 100))]
    pub name: String,

    #[validate(range(min = 0, max = 999_999))]
    pub quantity: i32,

    #[validate(range(min = 0, max = 999_999))]
    pub price: f32,
}

#[derive(Clone, Deserialize, Serialize, Validate)]
pub struct UpdateItemDTO {
    pub item_id: i32,

    #[validate(length(min = 1, max = 100))]
    pub name: String,

    #[validate(range(min = 0, max = 999_999))]
    pub quantity: i32,

    #[validate(range(min = 0, max = 999_999))]
    pub price: f32,
}
