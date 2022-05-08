use crate::models;
use prelude::models::report_model::CreateReport;
use prelude::Result;
use serde_json;
use tokio;

pub struct A11y;

impl A11y {
    pub async fn report(url: &str) -> Result<Vec<CreateReport>> {
        let output = tokio::process::Command::new("axe")
            .arg(url)
            .arg("--chromedriver-path")
            .arg("/usr/bin/chromedriver")
            .arg("-j")
            .output()
            .await
            .expect("Failure when generate a11y report possible axe not exists");

        let report_text = String::from_utf8(output.stdout).unwrap();

        let banana = serde_json::from_str::<Vec<models::axe::Axe>>(&report_text)
            .expect("Error when connvert to report");

        let axe = banana.get(0).expect("Error when get axe");
        Ok(axe.into())
    }
}
