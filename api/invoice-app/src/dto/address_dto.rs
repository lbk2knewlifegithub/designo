use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Clone, Deserialize, Serialize, Validate)]
pub struct CreateAddressDTO {
    #[validate(length(min = 2, max = 100))]
    pub street: String,

    #[validate(length(min = 1, max = 30))]
    #[serde(rename(deserialize = "postCode"))]
    pub post_code: String,

    #[validate(length(min = 1, max = 50))]
    pub country: String,
}
