use super::AppError;
use derive_more::Display;

#[derive(Debug, Display)]
pub enum InvoiceError {
    PaymentTermsNotFound(i32),
    StatusNotFound(String),
}

impl From<InvoiceError> for AppError {
    fn from(e: InvoiceError) -> Self {
        let error = format!("{}", e);
        match e {
            InvoiceError::PaymentTermsNotFound(i32) => {
                AppError::BadRequest(error, "PaymentTerms not found".to_owned())
            }
            InvoiceError::StatusNotFound(_) => {
                AppError::BadRequest(error, "Status not found".to_owned())
            }
        }
    }
}
