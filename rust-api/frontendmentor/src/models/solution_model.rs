use chrono::NaiveDateTime;
use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub struct Solution {
    pub solution_id: i32,

    #[serde(rename(serialize = "createdAt"))]
    pub created_at: NaiveDateTime,

    #[serde(rename(serialize = "updatedAt"))]
    pub updated_at: NaiveDateTime,

    pub title: String,

    #[serde(rename(serialize = "repoURL"))]
    pub repo_url: String,

    #[serde(rename(serialize = "liveSiteURL"))]
    pub live_site_url: String,

    #[serde(rename(serialize = "liveSiteURL"))]
    pub image: String,

    pub tags: Vec<String>,

    pub questions: String,

    pub likes: i32,

    pub bookmarks: i32,

    #[serde(rename(serialize = "isPrivate"))]
    pub is_private: bool,

    #[serde(rename(serialize = "isBookmarked"))]
    pub is_bookmarked: bool,

    #[serde(rename(serialize = "isLiked"))]
    pub is_liked: bool,

    #[serde(rename(serialize = "isCommented"))]
    pub is_commented: bool,
}
