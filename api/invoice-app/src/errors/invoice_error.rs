use super::AppError;
use derive_more::Display;

#[derive(Debug, Display)]
pub enum InvoiceError {
    PaymentTermsNotFound(i32),
    StatusNotFound(String),
    InvalidInvoice(String),
    NotFound(i32),
}

impl From<InvoiceError> for AppError {
    fn from(e: InvoiceError) -> Self {
        let error = format!("{}", e);
        match e {
            InvoiceError::PaymentTermsNotFound(_) => {
                AppError::bad_request(error, "PaymentTerms not found".to_owned())
            }
            InvoiceError::StatusNotFound(_) => {
                AppError::bad_request(error, "Status not found".to_owned())
            }
            InvoiceError::InvalidInvoice(_) => {
                AppError::bad_request(error, "invalid invoice".to_owned())
            }
        }
    }
}
