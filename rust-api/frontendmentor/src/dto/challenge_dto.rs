use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::models::challenge_model::Language;

use super::gallery_dto::GalleryDTO;

#[derive(Serialize, Deserialize, Validate)]
pub struct ChallengeDTO {
    pub steps: String,
    pub ideas: String,

    #[serde(rename(deserialize = "type"))]
    pub challenge_type: String,

    pub languages: Vec<Language>,

    #[serde(rename(deserialize = "heroImage"))]
    pub hero_image: String,
    pub title: String,
    pub description: String,
    pub difficulty: String,

    #[serde(rename(deserialize = "starterURL"))]
    pub starter_url: String,
    pub brief: String,
    pub gallery: Vec<GalleryDTO>,
}
