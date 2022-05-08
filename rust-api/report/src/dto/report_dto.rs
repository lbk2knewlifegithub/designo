use serde::Deserialize;
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct ReportDTO {
    #[validate(url)]
    pub url: String,
    pub solution_id: i32,
}
