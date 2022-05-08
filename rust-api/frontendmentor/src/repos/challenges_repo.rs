use crate::{dto::challenge_dto::ChallengeDTO, models::challenge_model::Challenge};

use prelude::{errors::AppError, Result, Transaction};

/// All Challenges REPO
pub async fn all_challenges(trans: &Transaction<'_>) -> Result<Vec<Challenge>> {
    let stmt = trans
        .prepare(
            &r#"
            SELECT 
                challenge_id, 
                started_count, 
                completed_count, 
                title,
                hero_image, 
                description,
                brief,
                created_at, 
                updated_at, 
                starter_url, 
                "type" as challenge_type,
                difficulty,
                steps, 
                ideas,
                (SELECT jsonb_agg(row) FROM (SELECT l.name FROM public.languages l WHERE l.challenge_id = c.challenge_id) AS row) AS languages,
                (SELECT jsonb_agg(row) FROM (SELECT g.preview, g.design, g.title FROM public.gallery g WHERE g.challenge_id = c.challenge_id) AS row) AS gallery
        FROM public.challenges AS c;"#,
        )
        .await.expect("Error preparing statement GET_ALL_INVOICES");

    Ok(trans
        .query(&stmt, &[])
        .await?
        .iter()
        .map(|row| Challenge::from_row_ref(row).unwrap())
        .collect::<Vec<Challenge>>())
}

/// Create Challenge
pub async fn crate_challenge(trans: &Transaction<'_>, challenge_dto: &ChallengeDTO) -> Result<i32> {
    let stmt = trans
        .prepare(
            &r#"
                INSERT INTO public.challenges(
                    steps,
                    ideas,
                    brief,
                    title, 
                    hero_image, 
                    description, 
                    starter_url,
                    type,
                    difficulty)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING challenge_id;"#,
        )
        .await
        .expect("Error preparing statement CREATE_CHALLENGE");

    let ChallengeDTO {
        steps,
        brief,
        ideas,
        challenge_type,
        hero_image,
        title,
        description,
        starter_url,
        difficulty,
        ..
    } = challenge_dto;

    match trans
        .query_one(
            &stmt,
            &[
                steps,
                ideas,
                brief,
                title,
                hero_image,
                description,
                starter_url,
                challenge_type,
                difficulty,
            ],
        )
        .await
    {
        Ok(row) => Ok(row.get(0)),
        Err(e) => Err(AppError::internal_server_error(e.into())),
    }
}
