use derive_more::Display;

#[derive(Debug, Display)]
pub enum InvoiceError {
    PaymentTermsNotFound(i32),
    StatusNotFound(String),
}
