use prelude::{errors::AppError, Result, Transaction};

/// Create Languages
pub async fn create_languages(
    trans: &Transaction<'_>,
    challenge_id: &i32,
    languages: &Vec<String>,
) -> Result<()> {
    let stmt = trans
        .prepare(
            &vec![
                "INSERT INTO public.languages(challenge_id, name) VALUES",
                &languages
                    .iter()
                    .enumerate()
                    .map(|(index, _)| {
                        let base = index * 2;
                        format!("(${}, ${})", base + 1, base + 2)
                    })
                    .collect::<Vec<_>>()
                    .join(", "),
            ]
            .join(" "),
        )
        .await
        .expect("Error preparing statement CREATE_LANGUAGES");

    let mut params = Vec::with_capacity(languages.len() * 2);

    for lang in languages.iter() {
        params.push(challenge_id);
        params.push(lang);
    }

    match trans.query(&stmt, &params[..]).await {
        Ok(_) => Ok(()),
        Err(e) => Err(AppError::internal_server_error(e.into())),
    }
}
