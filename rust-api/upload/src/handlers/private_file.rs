use actix_files::Files;
use actix_web::web;

/// Configure Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        // Static Route
        Files::new("", "./public").show_files_listing(),
    );
}
