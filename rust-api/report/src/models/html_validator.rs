use prelude::models::report_model::{CreateReport, ReportLevel, ReportType};
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
enum MessageType {
    #[serde(rename = "info")]
    Info,
    #[serde(rename = "error")]
    Error,
}

impl From<MessageType> for ReportLevel {
    fn from(message_type: MessageType) -> Self {
        match message_type {
            MessageType::Info => ReportLevel::Info,
            MessageType::Error => ReportLevel::Error,
        }
    }
}

#[derive(Clone, Deserialize, Serialize)]
struct Message {
    #[serde(rename = "type")]
    message_type: MessageType,
    message: String,
    extract: String,
}

#[derive(Clone, Deserialize, Serialize)]
pub struct HtmlValidator {
    messages: Vec<Message>,
}

impl From<&Message> for CreateReport {
    fn from(msg: &Message) -> Self {
        let Message {
            message_type,
            message,
            extract,
        } = msg;

        CreateReport {
            report_type: ReportType::HtmlValidator,
            level: message_type.clone().into(),
            title: message.to_owned(),
            context: extract.to_owned(),
            help: None,
        }
    }
}

impl From<&HtmlValidator> for Vec<CreateReport> {
    fn from(html_validator: &HtmlValidator) -> Self {
        html_validator.messages.iter().map(|m| m.into()).collect()
    }
}
