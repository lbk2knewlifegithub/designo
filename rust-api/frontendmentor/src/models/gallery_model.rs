use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum GalleryType {
    #[serde(rename(serialize = "desktop"))]
    Desktop,
    #[serde(rename(serialize = "mobile"))]
    Mobile,
    #[serde(rename(serialize = "inner"))]
    Inner,
    #[serde(rename(serialize = "tablet"))]
    Tablet,
    #[serde(rename(serialize = "active"))]
    Active,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Gallery {
    pub gallery_id: i32,
    pub challenge_id: i32,
    pub title: String,
    pub preview: String,
    pub design: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Image {
    title: String,
    preview: String,
    design: String,
}
