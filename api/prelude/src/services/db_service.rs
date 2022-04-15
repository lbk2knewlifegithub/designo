use deadpool_postgres::{Manager, ManagerConfig, Pool, RecyclingMethod};
use std::env::var;
use tokio_postgres::NoTls;

pub struct DbConfig {
    pub username: String,
    pub password: String,
    pub host: String,
    pub db_name: String,
    pub port: u16,
}

impl DbConfig {
    pub fn new(username: &str, password: &str, host: &str, db_name: &str, port: u16) -> Self {
        DbConfig {
            username: username.to_owned(),
            password: password.to_owned(),
            host: host.to_owned(),
            db_name: db_name.to_owned(),
            port,
        }
    }

    /// Create a new pool of database connections.
    pub fn connect(&self) -> Pool {
        let mut config = tokio_postgres::Config::new();
        config.host(&self.host);
        config.user(&self.username);
        config.password(&self.password);
        config.dbname(&self.db_name);
        config.port(self.port);

        let mgr_config = ManagerConfig {
            recycling_method: RecyclingMethod::Fast,
        };

        let mgr = Manager::from_config(config, NoTls, mgr_config);
        Pool::builder(mgr).build().unwrap()
    }
}

#[derive(Clone)]
pub struct DBService {
    pub pool: Pool,
}

impl DBService {
    pub fn from_env() -> Self {
        let host = var("YSQL_HOST").expect("Missing YSQL_HOST (YugabyteDB Host)");

        let username = var("YSQL_USERNAME").expect("Missing YSQL_USERNAME (Yugabyte Username)");

        let password = var("YSQL_PASSWORD").expect("Missing YSQL_PASSWORD (Yugabyte password)");

        let db_name = var("YSQL_DBNAME").expect("Missing YSQL_DBNAME (Yugabyte database name).");

        let port = var("YSQL_PORT")
            .expect("Missing YSQL_PORT (Yugabyte port).")
            .parse()
            .expect("Invalid YSQL_PORT (Yugabyte port) must be a number.");

        let config = DbConfig::new(&username, &password, &host, &db_name, port);

        Self {
            pool: config.connect(),
        }
    }
}
