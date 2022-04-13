use deadpool_postgres::{Manager, ManagerConfig, Pool, RecyclingMethod};
use std::env::var;
use tokio_postgres::NoTls;

pub struct DbConfig {
    pub username: String,
    pub password: String,
    pub host: String,
    pub db_name: String,
}

impl DbConfig {
    pub fn new(username: &str, password: &str, host: &str, db_name: &str) -> Self {
        DbConfig {
            username: username.to_owned(),
            password: password.to_owned(),
            host: host.to_owned(),
            db_name: db_name.to_owned(),
        }
    }

    /// Create a new pool of database connections.
    pub fn connect(&self) -> Pool {
        let mut pg_config = tokio_postgres::Config::new();
        pg_config.host(&self.host);
        pg_config.user(&self.username);
        pg_config.password(&self.password);
        pg_config.dbname(&self.db_name);

        let mgr_config = ManagerConfig {
            recycling_method: RecyclingMethod::Fast,
        };

        let mgr = Manager::from_config(pg_config, NoTls, mgr_config);
        Pool::builder(mgr).build().unwrap()
    }
}

#[derive(Clone)]
pub struct DBService {
    pub read: Pool,
    pub read_write: Pool,
}

impl DBService {
    pub fn from_env() -> Self {
        let host_read_write = var("PG_HOST_READ_WRITE")
            .expect("Missing PG_HOST_READ_WRITE (Postgres Host Read Write)");
        let host_read = var("PG_HOST_READ").expect("Missing PG_HOST_READ (Postgres Host Read)");

        let username = var("PG_USERNAME").expect("Missing PG_USERNAME (Postgres username)");

        let password = var("PG_PASSWORD").expect("Missing PG_PASSWORD (Postgres password)");

        let db_name = var("PG_DB_NAME").expect("Missing PG_DB_NAME (Postgres database name).");

        let read_config = DbConfig::new(&username, &password, &host_read, &db_name);
        let read_write_config = DbConfig::new(&username, &password, &host_read_write, &db_name);

        Self {
            read: read_config.connect(),
            read_write: read_write_config.connect(),
        }
    }
}
