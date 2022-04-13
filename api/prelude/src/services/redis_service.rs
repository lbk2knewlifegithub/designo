use actix::Addr;
use actix_redis::RedisActor;
use redis_async::resp_array;
use std::env::var;

pub struct RedisConfig {
    host: String,
    password: String,
}

impl RedisConfig {
    pub fn new(host: &str, password: &str) -> Self {
        Self {
            host: host.to_owned(),
            password: password.to_owned(),
        }
    }

    // 'redis://alice:foobared@awesome.redis.server:6379'
    fn create_addr(&self) -> String {
        format!("{}:6379", self.host)
    }

    /// Create a new pool of database connections.
    pub async fn connect(&self) -> Addr<RedisActor> {
        let addr = self.create_addr();
        let redis = RedisActor::start(addr.clone());
        // or redis.send(...).await
        redis
            .send(actix_redis::Command(resp_array![
                "AUTH",
                "default",
                &self.password
            ]))
            .await
            .expect("Failed to send messages to MailBox")
            .expect(format!("Failed to authenticate redis with url {addr}").as_str());

        redis
    }
}

#[derive(Clone)]
pub struct RedisService {
    pub read: Addr<RedisActor>,
    pub write: Addr<RedisActor>,
}

impl RedisService {
    pub async fn from_env() -> Self {
        let host_read = var("REDIS_HOST_READ").expect("Missing REDIS_HOST_READ (Redis Host Read)");
        let host_write =
            var("REDIS_HOST_WRITE").expect("Missing REDIS_HOST_WRITE (Redis Host Write)");
        let password = var("REDIS_PASSWORD").expect("Missing REDIS_PASSWORD (Redis Password)");

        let read_config = RedisConfig::new(&host_read, &password);
        let write_config = RedisConfig::new(&host_write, &password);

        RedisService {
            read: read_config.connect().await,
            write: write_config.connect().await,
        }
    }
}
