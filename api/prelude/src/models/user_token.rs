use serde::{Deserialize, Serialize};

/// User Token
#[derive(Debug, Serialize, Deserialize)]
pub struct UserToken {
    pub user_id: i32,
    pub admin: bool,
    pub exp: usize,
}

impl UserToken {
    pub fn new(user_id: i32) -> UserTokenBuilder {
        UserTokenBuilder {
            user_id,
            exp: None,
            admin: None,
        }
    }
}

pub struct UserTokenBuilder {
    user_id: i32,
    exp: Option<usize>,
    admin: Option<bool>,
}

impl UserTokenBuilder {
    pub fn user_id(&mut self, user_id: i32) -> &mut Self {
        self.user_id = user_id;
        self
    }

    pub fn exp(mut self, exp: usize) -> Self {
        self.exp = Some(exp);
        self
    }

    pub fn admin(mut self, admin: bool) -> Self {
        self.admin = Some(admin);
        self
    }

    pub fn build(self) -> UserToken {
        UserToken {
            user_id: self.user_id,
            exp: self.exp.unwrap_or(10000000000),
            admin: self.admin.unwrap_or_default(),
        }
    }
}
