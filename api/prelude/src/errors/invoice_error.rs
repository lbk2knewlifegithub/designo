use derive_more::Display;

#[derive(Debug, Display)]
pub enum InvoiceError {
    #[display(fmt = "PaymentTermsNotFound: {}", _0)]
    PaymentTermsNotFound(i32),
    #[display(fmt = "StatusNotFound: {}", _0)]
    StatusNotFound(String),
}
