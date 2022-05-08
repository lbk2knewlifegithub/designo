use serde::Deserialize;
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct GithubCode {
    #[validate(required, length(max = 100))]
    pub code: Option<String>,
}
