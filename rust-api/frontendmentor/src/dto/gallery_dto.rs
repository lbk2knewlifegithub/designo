use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Serialize, Deserialize, Validate)]
pub struct GalleryDTO {
    pub preview: String,
    pub design: String,
    pub title: String,
}
