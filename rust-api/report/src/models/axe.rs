use prelude::models::report_model::{CreateReport, ReportLevel, ReportType};
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]

enum ViolationImpact {
    #[serde(rename = "serious")]
    Serious,
    #[serde(rename = "moderate")]
    Moderate,
    #[serde(rename = "minor")]
    Minor,
    #[serde(rename = "critical")]
    Critical,
}

impl From<ViolationImpact> for ReportLevel {
    fn from(violation_impact: ViolationImpact) -> Self {
        match violation_impact {
            ViolationImpact::Serious => ReportLevel::Error,
            ViolationImpact::Critical | ViolationImpact::Moderate => ReportLevel::Warning,
            ViolationImpact::Minor => ReportLevel::Info,
        }
    }
}

#[derive(Deserialize, Serialize)]
struct Node {
    html: String,
}

#[derive(Deserialize, Serialize)]
struct Violation {
    impact: ViolationImpact,
    help: String,
    #[serde(rename = "helpUrl")]
    help_url: String,
    nodes: Vec<Node>,
}

#[derive(Deserialize, Serialize)]
pub struct Axe {
    violations: Vec<Violation>,
}

impl From<&Violation> for Vec<CreateReport> {
    fn from(violation: &Violation) -> Self {
        violation
            .nodes
            .iter()
            .map(move |node| CreateReport {
                report_type: ReportType::A11y,
                level: violation.impact.clone().into(),
                title: violation.help.to_owned(),
                context: node.html.to_owned(),
                help: Some(violation.help_url.to_owned()),
            })
            .collect()
    }
}

impl From<&Axe> for Vec<CreateReport> {
    fn from(axe: &Axe) -> Self {
        axe.violations
            .iter()
            .flat_map::<Vec<CreateReport>, _>(|v| v.into())
            .collect()
    }
}
