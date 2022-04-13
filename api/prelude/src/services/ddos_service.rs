use crate::guards::ddos_guard::{DDosGuard, DDosGuardLevel};

use super::redis_service::RedisService;

#[derive(Clone)]
pub struct DDosService {
    pub high: DDosGuard,
    pub medium: DDosGuard,
    pub low: DDosGuard,
}

impl DDosService {
    pub fn new(redis: RedisService) -> Self {
        Self {
            high: DDosGuard::new(redis.clone(), &DDosGuardLevel::High),
            medium: DDosGuard::new(redis.clone(), &DDosGuardLevel::Medium),
            low: DDosGuard::new(redis.clone(), &DDosGuardLevel::Low),
        }
    }
}
