use super::gallery_model::Gallery;
use serde::Deserialize;
use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub enum ChallengeType {
    #[serde(rename = "free")]
    Free,
    #[serde(rename = "free+")]
    FreePlus,
    #[serde(rename = "premium")]
    Premium,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Difficulty {
    #[serde(rename = "newbie")]
    Newbie,
    #[serde(rename = "junior")]
    Junior,
    #[serde(rename = "intermediate")]
    Intermediate,
    #[serde(rename = "advanced")]
    Advanced,
    #[serde(rename = "guru")]
    Guru,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Language {
    #[serde(rename = "html")]
    Html,
    #[serde(rename = "css")]
    Css,
    #[serde(rename = "js")]
    Js,
    #[serde(rename = "api")]
    Api,
    #[serde(rename = "general")]
    General,
}

impl ToString for Language {
    fn to_string(&self) -> String {
        match self {
            Language::Html => "html".to_owned(),
            Language::Css => "css".to_owned(),
            Language::Js => "js".to_owned(),
            Language::Api => "api".to_owned(),
            Language::General => "general".to_owned(),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct Challenge {
    pub challenge_id: i32,

    // #[serde(rename(serialize = "createdAt"))]
    // pub created_at: NaiveDateTime,

    // #[serde(rename(serialize = "updatedAt"))]
    // pub updated_at: NaiveDateTime,
    #[serde(rename = "type")]
    pub challenge_type: String,

    pub title: String,

    pub difficulty: String,

    #[serde(rename(serialize = "startedCount"))]
    pub started_count: i32,

    #[serde(rename(serialize = "completedCount"))]
    pub completed_count: i32,

    pub description: String,

    // pub languages: Vec<String>,
    #[serde(rename(serialize = "heroImage"))]
    pub hero_image: String,

    pub brief: String,

    pub gallery: Vec<Gallery>,

    #[serde(rename(serialize = "starter_url"))]
    pub starter_url: String,
}
