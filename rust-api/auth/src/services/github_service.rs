use crate::models::github_model::UserGithub;
use prelude::{errors::github_error::GithubError, Result};
use reqwest::{
    self,
    header::{ACCEPT, AUTHORIZATION, USER_AGENT},
};
use serde_derive::Deserialize;
use std::env::var;
use tracing::debug;

#[derive(Deserialize)]
struct GithubTokenResponse {
    access_token: String,
}

#[derive(Deserialize)]
pub struct UserEmail {
    email: String,
    primary: bool,
}

#[derive(Clone)]
pub struct GithubService {
    client_id: String,
    client_secret: String,
}

impl GithubService {
    pub fn from_env() -> Self {
        let client_id = var("GITHUB_OAUTH_CLIENT_ID").expect("Missing GITHUB_OAUTH_CLIENT_ID");
        let client_secret =
            var("GITHUB_OAUTH_CLIENT_SECRET").expect("Missing GITHUB_OAUTH_CLIENT_SECRET");
        Self {
            client_id: client_id.to_owned(),
            client_secret: client_secret.to_owned(),
        }
    }

    /// Get Access Token
    async fn get_access_token(&self, code: &str) -> Result<GithubTokenResponse> {
        let url = format!(
            "https://github.com/login/oauth/access_token?client_id={}&client_secret={}&code={}",
            self.client_id, self.client_secret, code
        );

        let client = reqwest::Client::new();

        Ok(client
            .get(url)
            .header(ACCEPT, "application/json")
            .send()
            .await
            .map_err(|e| {
                debug!("Error when get github access_token {e}");
                GithubError::GetUserFailure(e)
            })?
            .json::<GithubTokenResponse>()
            .await
            .map_err(|e| {
                debug!("Error when DECODE github access_token {e}");
                GithubError::GetUserFailure(e)
            })?)
    }

    async fn fetch_email(access_token: &str) -> Result<String> {
        let client = reqwest::Client::new();

        let emails = client
            .get("https://api.github.com/user/emails")
            .header(ACCEPT, "application/json")
            .header(USER_AGENT, "Rust")
            .header(AUTHORIZATION, format!("Bearer {}", access_token))
            .send()
            .await
            .map_err(|e| GithubError::GetUserFailure(e))?
            .json::<Vec<UserEmail>>()
            .await
            .map_err(|e| GithubError::GetUserFailure(e))?;

        let user = emails.into_iter().find(|e| e.primary).unwrap();
        return Ok(user.email);
    }

    /// Get user
    pub async fn get_user(&self, code: &str) -> Result<UserGithub> {
        let access_token = self.get_access_token(code).await?.access_token;
        let client = reqwest::Client::new();

        let mut user_github = client
            .get("https://api.github.com/user")
            .header(ACCEPT, "application/json")
            .header(USER_AGENT, "Rust")
            .header(AUTHORIZATION, format!("Bearer {}", access_token))
            .send()
            .await
            .map_err(|e| GithubError::GetUserFailure(e))?
            .json::<UserGithub>()
            .await
            .map_err(|e| GithubError::GetUserFailure(e))?;

        if let None = user_github.email {
            user_github.email = Some(GithubService::fetch_email(&access_token).await?);
        }

        return Ok(user_github);
    }
}
