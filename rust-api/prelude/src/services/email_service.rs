// use crate::Result;
// use handlebars::Handlebars;
// use lettre::{
//     message::{header, SinglePart},
//     transport::smtp::{authentication::Credentials, response::Response as LettreResponse},
//     AsyncSmtpTransport,
//     AsyncTransport,
//     // AsyncTransport,
//     Message,
//     Tokio1Executor,
// };
// use std::env::var;
// #[derive(Debug, Clone)]
// pub struct EmailService {
//     email_address: String,
//     credentials: Credentials,
//     handlebars: Handlebars<'static>,
//     client_auth: String,
// }
// impl EmailService {
//     pub fn from_env() -> Self {
//         let email_address = var("EMAIL_ADDRESS").expect("Missing EMAIL_ADDRESS.");
//         let username = var("EMAIL_USERNAME").expect("Missing EMAIL_USERNAME");
//         let password = var("EMAIL_PASSWORD").expect("Missing EMAIL_PASSWORD");
//         let email_templates_folder =
//             var("EMAIL_TEMPLATES_FOLDER").expect("Missing EMAIL_TEMPLATES_FOLDER");

//         // Init Credentials
//         let credentials = Credentials::new(username, password);

//         // Init Handlebars
//         let mut handlebars = Handlebars::new();
//         handlebars
//             .register_template_file(
//                 "email",
//                 format!("{}/verify-email.hbs", email_templates_folder),
//             )
//             .expect("Failed to register template");

//         Self {
//             email_address,
//             credentials,
//             handlebars,
//             client_auth,
//         }
//     }

//     fn render_html_verify_email(&self, session_id: &str) -> Result<String> {
//         let data = serde_json::json!({
//             "verify_url": format!("{}?token={}",&self.client_auth, session_id),
//         });

//         Ok(self.handlebars.render("email", &data)?)
//     }

//     pub async fn send_verify(&self, to: &str, session_id: &str) -> Result<LettreResponse> {
//         let html = self
//             .render_html_verify_email(session_id)
//             .expect("Failed to render email");

//         let to_mbox = to
//             .parse()
//             .expect(format!("Failed to parse to_mbox address {}", to).as_str());

//         let from_mbox = self
//             .email_address
//             .parse()
//             .expect(format!("Failed to parse from_mbox address {}", self.email_address).as_str());

//         let email = Message::builder()
//             .from(from_mbox)
//             .to(to_mbox)
//             .subject("Verify address product feedbacks")
//             .singlepart(
//                 SinglePart::builder()
//                     .header(header::ContentType::TEXT_HTML)
//                     .body(html),
//             )
//             .expect("Failed to build email");

//         // Open a remote connection to gmail
//         let mailer: AsyncSmtpTransport<Tokio1Executor> =
//             AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.gmail.com")
//                 .expect("EmailService -> Failed to create mailer")
//                 .credentials(self.credentials.clone())
//                 .build();
//         // Send the email
//         Ok(mailer.send(email).await?)
//     }
// }
