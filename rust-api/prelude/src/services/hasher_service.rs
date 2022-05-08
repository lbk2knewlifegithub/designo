// use crate::Result;
// use argon2::{
//     password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
//     Argon2,
// };

// #[derive(Clone)]
// pub struct HashService {}

// impl HashService {
//     pub async fn hash(&self, password: &str) -> Result<String> {
//         let salt = SaltString::generate(&mut OsRng);
//         let argon2 = Argon2::default();
//         Ok(argon2
//             .hash_password(password.as_bytes(), &salt)?
//             .to_string())
//     }

//     pub async fn verify(&self, hashed_password: &str, password: &str) -> Result<()> {
//         let parsed_hash = PasswordHash::new(&hashed_password)?;
//         Argon2::default()
//             .verify_password(password.as_bytes(), &parsed_hash)
//             .map_err(Into::into)
//     }
// }
