use serde_derive::Serialize;

#[derive(Debug, Serialize)]
pub struct Notifications {
    pub notification_id: i32,
    #[serde(rename(serialize = "createdAt"))]
    pub created_at: i32,

    #[serde(rename(serialize = "type", deserialize = "type"))]
    pub notify_type: String,
}
