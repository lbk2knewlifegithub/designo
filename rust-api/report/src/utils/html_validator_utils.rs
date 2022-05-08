use crate::models::html_validator::HtmlValidator as HtmlValidatorModel;
use prelude::models::report_model::CreateReport;
use prelude::Result;
use serde_json;
use tokio;

pub struct HtmlValidator;

impl HtmlValidator {
    pub async fn report(url: &str) -> Result<Vec<CreateReport>> {
        let output = tokio::process::Command::new("html-validator")
            .arg(url)
            .arg("--verbose")
            .arg("--format")
            .arg("json")
            .output()
            .await
            .expect(
                "Failure when generate http-validator report possible html-validator not exists",
            );

        let text = String::from_utf8(output.stdout).unwrap();

        let html_validator = serde_json::from_str::<HtmlValidatorModel>(&text)
            .expect("Error when connvert to report");

        Ok(Vec::<CreateReport>::from(&html_validator))
    }
}
