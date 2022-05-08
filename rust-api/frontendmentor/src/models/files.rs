use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct Files {
    pub file_id: i32,
    pub starter: String,
    pub figma: String,
    pub sketch: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FilesMini {
    starter: String,
    figma: String,
    sketch: String,
}
