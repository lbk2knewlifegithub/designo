#[derive(Debug)]
pub struct Config {}

impl Config {
    pub fn init() {
        std::env::set_var("RUST_LOG", "debug");
        dotenv::dotenv().ok();
        // Init Tracing
        tracing_subscriber::fmt::init();
    }
}
