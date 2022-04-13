use derive_more::Display;

#[derive(Debug, Display)]
pub enum AuthError {
    Unauthorize,
}
