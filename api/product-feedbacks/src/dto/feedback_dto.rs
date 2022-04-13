use serde::Deserialize;
use validator::Validate;

#[derive(Clone, Deserialize, Validate)]
pub struct UpdateFeedbackDTO {
    #[validate(length(min = 3, max = 150))]
    pub title: String,

    #[validate(length(min = 2, max = 50))]
    pub category: String,

    #[validate(length(min = 2, max = 50))]
    pub status: String,

    #[validate(length(min = 8, max = 500))]
    pub description: String,
}

/// Feedback Request
#[derive(Debug, Deserialize, Validate)]
pub struct CreateFeedbackDTO {
    #[validate(length(min = 3, max = 150))]
    pub title: String,

    #[validate(length(min = 2, max = 50))]
    pub category: String,

    #[validate(length(min = 8, max = 500))]
    pub description: String,
}
