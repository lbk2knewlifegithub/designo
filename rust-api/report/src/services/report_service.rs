use crate::{dto::report_dto::ReportDTO, utils, ReportState};
use prelude::{models::report_model::CreateReport, Result};

/// Create Report
pub async fn create_report(
    state: &ReportState,
    reportDTO: &ReportDTO,
) -> Result<Vec<CreateReport>> {
    // Connect to pool
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    let ReportDTO { url, solution_id } = reportDTO;

    let mut a11y = utils::a11y_utils::A11y::report(&url).await.unwrap();
    let mut html_validator = utils::html_validator_utils::HtmlValidator::report(&url)
        .await
        .unwrap();

    a11y.append(&mut html_validator);

    // Save all report to database
    Ok(a11y)
}
