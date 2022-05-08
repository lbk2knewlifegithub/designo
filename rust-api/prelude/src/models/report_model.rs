use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]

pub enum IssueLevel {
    #[serde(rename = "info")]
    Info,
    #[serde(rename = "warning")]
    Warning,
    #[serde(rename = "error")]
    Error,
}

#[derive(Debug, Deserialize, Serialize)]

pub enum IssueType {
    A11y,
    #[serde(rename = "html_validator")]
    HtmlValidator,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Issue {
    pub issue_id: i32,
    #[serde(rename = "type")]
    pub issue_type: IssueType,
    pub level: IssueLevel,
    pub title: String,
    pub context: String,
    pub help: String,
    #[serde(rename(serialize = "createdAt"))]
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateIssue {
    #[serde(rename = "type")]
    pub issue_type: IssueType,
    pub level: IssueLevel,
    pub title: String,
    pub context: String,
    pub help: Option<String>,
}

pub struct Report {
    pub report_id: i32,
    pub a11y: Vec<Issue>,
    pub html_validator: Vec<Issue>,
}
