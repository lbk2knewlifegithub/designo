use validator::ValidationError;
static PAYMENT_TERMS: &'static [i32] = &[1, 7, 30];
static STATUES: &'static [&str] = &["paid", "draft", "pending"];

pub fn payment_terms_validate(value: i32) -> Result<(), ValidationError> {
    match PAYMENT_TERMS.contains(&value) {
        true => Ok(()),
        false => Err(ValidationError::new("payment_terms invalid")),
    }
}

pub fn status_validate(value: &String) -> Result<(), ValidationError> {
    match STATUES.contains(&value.as_str()) {
        true => Ok(()),
        false => Err(ValidationError::new("Status invalid")),
    }
}
