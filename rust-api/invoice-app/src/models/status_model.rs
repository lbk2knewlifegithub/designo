use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, PostgresMapper)]
#[pg_mapper(table = "statuses")]
pub struct Status {
    pub status_id: i32,
    pub name: String,
}
