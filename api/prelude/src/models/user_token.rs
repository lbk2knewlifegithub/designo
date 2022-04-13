use serde::{Deserialize, Serialize};

/// User Token
#[derive(Debug, Serialize, Deserialize)]
pub struct UserToken {
    pub user_id: i32,
    pub exp: usize,
}

impl UserToken {
    pub fn new(user_id: i32) -> UserTokenBuilder {
        UserTokenBuilder { user_id, exp: None }
    }
}

pub struct UserTokenBuilder {
    user_id: i32,
    exp: Option<usize>,
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

    pub fn build(self) -> UserToken {
        UserToken {
            user_id: self.user_id,
            exp: self.exp.unwrap_or(10000000000),
        }
    }
}
