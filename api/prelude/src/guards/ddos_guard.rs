use actix_redis::Command;
use redis_async::resp::FromResp;
use redis_async::resp_array;

use crate::errors::AppError;
use crate::services::redis_service::RedisService;
use crate::Result;

pub enum DDosGuardLevel {
    Low,
    Medium,
    High,
}

#[derive(Clone)]
pub struct DDosGuard {
    redis: RedisService,
    expire: String,
}

impl DDosGuard {
    pub fn new(redis: RedisService, level: &DDosGuardLevel) -> Self {
        let expire = match level {
            DDosGuardLevel::Low => "1",
            DDosGuardLevel::Medium => "2",
            DDosGuardLevel::High => "5",
        };
        Self {
            redis,
            expire: expire.to_owned(),
        }
    }

    pub async fn remember(&self, key: &str) -> Result<()> {
        self.redis
            .write
            .send(Command(resp_array![
                "SET",
                key,
                "1",
                "EX",
                self.expire.as_str()
            ]))
            .await??;
        Ok(())
    }

    pub async fn check(&self, key: &str) -> Result<()> {
        let resp = self
            .redis
            .read
            .send(Command(resp_array!["GET", key]))
            .await??;

        // Check user already upvoted it feedback 1s ago will return too many request
        if let Ok(_) = String::from_resp_int(resp) {
            return Err(AppError::DDosError);
        };

        Ok(())
    }
}
