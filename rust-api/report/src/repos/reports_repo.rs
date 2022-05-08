use deadpool_postgres::Client;
use postgres_binary_copy::BinaryCopyReader;
use postgres_types::{ToSql, Type};
use prelude::models::report_model::CreateReport;
use prelude::Result;
use streaming_iterator::{self, StreamingIterator};

/// Create Report REPO
pub async fn create_report(
    client: &Client,
    solution_id: &i32,
    create_reports: Vec<CreateReport>,
) -> Result<()> {
    let types = &[Type::INT4, Type::VARCHAR];

    let data: Vec<Box<dyn ToSql>> = vec![
        Box::new(1i32),
        Box::new("hello"),
        Box::new(2i32),
        Box::new("world"),
    ];
    let data = streaming_iterator::convert(data.into_iter()).map_ref(|v| &**v);
    let mut reader = BinaryCopyReader::new(types, data);

    let stmt = client
        .prepare("COPY report (id, bar) FROM STDIN (FORMAT binary)")
        .await
        .unwrap();

    stmt.copy_in(&[], &mut reader).unwrap();

    Ok(())
}
