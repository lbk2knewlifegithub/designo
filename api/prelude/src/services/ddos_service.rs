use crate::{errors::AppError, Result};
use actix_redis::Command;
use redis_async::{resp::FromResp, resp_array};

use super::redis_service::RedisService;

#[derive(Clone)]
pub struct DDosService {
    pub redis: RedisService,
}

impl DDosService {
    pub fn new(redis: RedisService) -> Self {
        Self { redis }
    }

    pub async fn remember(&self, key: &str, expire: usize) -> Result<()> {
        self.redis
            .write
            .send(Command(resp_array![
                "SET",
                key,
                "1",
                "EX",
                expire.to_string()
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

        if let Ok(_) = String::from_resp_int(resp) {
            return Err(AppError::DDosError);
        };

        Ok(())
    }
}
