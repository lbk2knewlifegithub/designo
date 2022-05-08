use crate::dto::gallery_dto::GalleryDTO;

use prelude::{Pool, Result};

/// Create Gallery
pub async fn create_galleries(
    trans: &Pool,
    challenge_id: &i32,
    galleries: &Vec<GalleryDTO>,
) -> Result<()> {
    let stmt = trans
        .prepare(
            &vec![
                "INSERT INTO public.gallery(challenge_id, preview, design, title) VALUES",
                &galleries
                    .iter()
                    .enumerate()
                    .map(|(index, _)| {
                        let base = index * 4;
                        format!(
                            "(${}, ${}, ${}, ${})",
                            base + 1,
                            base + 2,
                            base + 3,
                            base + 4
                        )
                    })
                    .collect::<Vec<_>>()
                    .join(", "),
                ";",
            ]
            .join(" "),
        )
        .await
        .expect("Error preparing statement CREATE_GALLERIES");

    let mut params = Vec::<&(dyn ToSql + Sync)>::with_capacity(galleries.len() * 4);

    for gallery in galleries.iter() {
        params.push(challenge_id);
        params.push(&gallery.preview);
        params.push(&gallery.design);
        params.push(&gallery.title);
    }

    trans.execute(&stmt, &params[..]).await?;

    Ok(())
}
