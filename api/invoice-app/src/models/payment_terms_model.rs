use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Debug, PostgresMapper)]
#[pg_mapper(table = "payment_terms")]
pub struct PaymentTerms {
    pub payment_terms_id: i32,
    pub days: i32,
}
