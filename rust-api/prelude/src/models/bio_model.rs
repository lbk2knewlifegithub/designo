use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Bio {
    pub bio_id: i32,
    pub website: String,
    #[serde(rename(serialize = "currentLearning"))]
    pub current_learning: String,
    pub content: String,
}
