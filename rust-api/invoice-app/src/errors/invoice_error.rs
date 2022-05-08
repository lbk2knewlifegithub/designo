use derive_more::Display;
use prelude::errors::AppError;

#[derive(Debug, Display)]
pub enum InvoiceError<'a> {
    PaymentTermsNotFound(&'a i32),
    StatusNotFound(&'a str),
    InvalidInvoice(&'a str),
    NotFound(&'a i32),
}

impl From<InvoiceError<'_>> for AppError {
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
            InvoiceError::NotFound(_) => AppError::not_found(error, "invoice not found".to_owned()),
        }
    }
}
