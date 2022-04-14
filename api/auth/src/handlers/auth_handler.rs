use crate::{
    dto::{
        auth_dto::{Credentials, Tokens},
        user_dto::{ChangePasswordDTO, CreateUserDTO, DeleteAccountDTO, UpdateAccountDTO},
    },
    models::user_model::{ChangePassword, DeleteAccount, UpdateAccount},
    services::auth_service,
    AuthState,
};

use actix_web::{web, HttpRequest, HttpResponse};
use actix_web_validator::Json;
use prelude::Result;

/// Login Route
async fn login(
    state: web::Data<AuthState>,
    credentital: Json<Credentials>,
) -> Result<HttpResponse> {
    auth_service::login(&state, &credentital)
        .await
        .map(|token| HttpResponse::Ok().json(token))
        .map_err(Into::into)
}

/// Sign Up Route
async fn signup(
    state: web::Data<AuthState>,
    create_user_dto: Json<CreateUserDTO>,
) -> Result<HttpResponse> {
    auth_service::signup(&state, &create_user_dto.into_inner())
        .await
        .map(|token| HttpResponse::Created().json(token))
        .map_err(Into::into)
}

/// Me
async fn me(state: web::Data<AuthState>, token: Json<Tokens>) -> Result<HttpResponse> {
    auth_service::me(&state, &token)
        .await
        .map(|user| HttpResponse::Created().json(user))
        .map_err(Into::into)
}

/// Request Send Verify Email
// async fn request_send_verify_email(
//     state: web::Data<AuthState>,
//     req: HttpRequest,
// ) -> Result<HttpResponse> {
//     let user_token = state.jwt.authorize(&req).await?;

//     auth_service::request_verify_email(&state, &user_token.user_id)
//         .await
//         .map(|_| HttpResponse::Created().finish())
//         .map_err(Into::into)
// }

// /// Verify Email Route
// async fn verify_email(
//     state: web::Data<AuthState>,
//     verify_email: Json<VerifyEmailDTO>,
// ) -> Result<HttpResponse> {
//     auth_service::verify_email(&state, &verify_email.into_inner().token.unwrap())
//         .await
//         .map(|_| HttpResponse::NoContent().finish())
//         .map_err(Into::into)
// }

/// Delete Account
async fn delete_account(
    state: web::Data<AuthState>,
    req: HttpRequest,
    delete_account_dto: Json<DeleteAccountDTO>,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let delete_account = DeleteAccount {
        user_id: user_token.user_id.to_owned(),
        password: delete_account_dto.password.to_owned(),
    };

    auth_service::delete_account(&state, delete_account)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Update Account
async fn update_account(
    state: web::Data<AuthState>,
    req: HttpRequest,
    update_account_dto: Json<UpdateAccountDTO>,
) -> Result<HttpResponse> {
    let user_token = state.jwt.authorize(&req).await?;

    let update_account = UpdateAccount::new(
        user_token.user_id.to_owned(),
        update_account_dto.into_inner(),
    );

    auth_service::update_account(&state, &update_account)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

/// Change Password Handler
async fn change_password(
    state: web::Data<AuthState>,
    change_password_dto: Json<ChangePasswordDTO>,
    req: HttpRequest,
) -> Result<HttpResponse> {
    // Check old_password and new_password is the same
    let ChangePasswordDTO {
        old_password,
        new_password,
    } = change_password_dto.into_inner();

    if old_password == new_password {
        return Ok(HttpResponse::BadRequest().body("Old password and new password is the same"));
    }

    // Validate access_token
    let user_token = state.jwt.authorize(&req).await?;

    let change_password = ChangePassword {
        user_id: user_token.user_id,
        old_password: old_password.to_owned(),
        new_password: new_password.to_owned(),
    };

    auth_service::change_password(&state, &change_password)
        .await
        .map(|_| HttpResponse::NoContent().finish())
        .map_err(Into::into)
}

///  Configure Auth Routes
pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            // Login
            .service(
                // Login
                web::scope("/login").service(
                    // Login
                    web::resource("").route(
                        // Login
                        web::post().to(login),
                    ),
                ),
            )
            // SignUp
            .service(
                // SignUp
                web::scope("/signup").service(
                    // SignUp
                    web::resource("").route(
                        // SignUp
                        web::post().to(signup),
                    ),
                ),
            )
            // Me
            .service(
                // Me
                web::scope("/me").service(
                    // Me
                    web::resource("")
                        // Me
                        .route(web::post().to(me))
                        // Delete Account
                        .route(web::delete().to(delete_account))
                        // Update Account
                        .route(web::put().to(update_account)),
                ),
            )
            // // Request Verify Email
            // .service(
            //     // Request Verify Email
            //     web::scope("/request-verify-email")
            //         // Request Verify Email
            //         .service(
            //             // Request Verify Email
            //             web::resource("")
            //                 // Request Verify Email
            //                 .route(
            //                     // Request Verify Email
            //                     web::post().to(request_send_verify_email),
            //                 ),
            //         ),
            // )
            // // Verify Email
            // .service(
            //     // Verify Email
            //     web::scope("/verify-email")
            //         // Verify Email
            //         .service(
            //             // Verify Email
            //             web::resource("")
            //                 // Verify Email
            //                 .route(
            //                     // Verify Email
            //                     web::post().to(verify_email),
            //                 ),
            //         ),
            // )
            // Change password
            .service(
                // Change password
                web::scope("/change-password").service(
                    // Change password
                    web::resource("").route(web::patch().to(change_password)),
                ),
            ),
    );
}
