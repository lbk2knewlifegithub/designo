use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserLinks {
    pub user_links_id: i32,
    pub github: String,
    pub twitter: String,
    #[serde(rename(serialize = "devTo"))]
    pub dev_to: String,
    pub hashnode: String,
    pub codepen: String,
    pub twitch: String,
    #[serde(rename(serialize = "stackOverFlow"))]
    pub stack_over_flow: String,
    pub gitlab: String,
    #[serde(rename(serialize = "freeCodeCamp"))]
    pub free_code_camp: String,
    pub medium: String,
    pub youtube: String,
    pub codewars: String,
}
