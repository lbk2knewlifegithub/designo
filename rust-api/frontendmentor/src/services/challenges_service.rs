use crate::{
    dto::challenge_dto::ChallengeDTO,
    models::challenge_model::Challenge,
    repos::{challenges_repo, gallery_repo, languages_repo},
    FrontendMentorState,
};
use prelude::Result;

///  All challenges Service
pub async fn all_challenges(state: &FrontendMentorState) -> Result<Vec<Challenge>> {
    let mut client = state.db.pool.get().await?;
    let trans = client.transaction().await?;
    Ok(challenges_repo::all_challenges(&trans).await?)
}

/// Create Challenge Service
pub async fn create_challenge(
    state: &FrontendMentorState,
    challenge_dto: &ChallengeDTO,
) -> Result<()> {
    // Connect to pool
    let mut client = state.db.pool.get().await?;
    // START TRANSACTION
    let trans = client.transaction().await?;

    // Create Challenge_id
    let challenge_id = challenges_repo::crate_challenge(&trans, &challenge_dto).await?;

    // Create Gallery
    gallery_repo::create_galleries(&trans, &challenge_id, &challenge_dto.gallery).await?;

    // Create Language
    languages_repo::create_languages(
        &trans,
        &challenge_id,
        &challenge_dto
            .languages
            .iter()
            .map(|l| l.to_string())
            .collect(),
    )
    .await?;

    // COMMIT TRANSACTION
    trans.commit().await?;

    Ok(())
}
