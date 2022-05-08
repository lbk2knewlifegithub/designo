use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub struct EmailSettings {
    pub email_settings_id: i32,

    #[serde(rename(serialize = "commentOnSolution"))]
    pub comment_on_solution: String,

    #[serde(rename(serialize = "replyOnComment"))]
    pub reply_on_comment: String,

    #[serde(rename(serialize = "mentionInComment"))]
    pub mention_in_comment: String,

    #[serde(rename(serialize = "earnAnArchivement"))]
    pub earn_an_archivement: String,
}
