use derive_more::Display;
use prelude::errors::AppError;

#[derive(Debug, Display)]
pub enum ItemError {
    InvalidItem,
    ItemNotFound,
}

impl From<ItemError> for AppError {
    fn from(e: ItemError) -> Self {
        let error = format!("{}", e);
        match e {
            ItemError::InvalidItem => AppError::bad_request(error, "invalid item".to_owned()),
            ItemError::ItemNotFound => AppError::bad_request(error, "item not found".to_owned()),
        }
    }
}
