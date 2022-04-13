use serde::Deserialize;
use validator::Validate;

#[derive(Clone, Deserialize, Validate)]
pub struct AddCommentDTO {
    pub parent_id: Option<i32>,

    #[validate(length(max = 40))]
    pub replying_to: Option<String>,

    #[validate(length(max = 250))]
    pub content: String,
}

#[derive(Clone, Deserialize, Validate)]
pub struct UpdateCommentDTO {
    #[validate(length(max = 250))]
    pub content: String,
}
