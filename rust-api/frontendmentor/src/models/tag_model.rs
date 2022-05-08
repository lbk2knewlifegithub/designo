use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub struct Tag {
    pub tag_id: i32,
    pub name: i32,
}
