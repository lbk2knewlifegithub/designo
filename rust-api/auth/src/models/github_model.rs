use serde_derive::Deserialize;

#[derive(Debug, Deserialize)]
pub struct UserGithub {
    pub name: Option<String>,
    pub login: String,
    pub avatar_url: String,
    pub email: Option<String>,
}
