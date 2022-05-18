CREATE TABLE
    public. "users" (
        user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "username" VARCHAR NOT NULL UNIQUE,
        "avatar" VARCHAR NOT NULL,
        "is_premium" bool NOT NULL DEFAULT FALSE,
        "is_hire_me" bool NOT NULL DEFAULT FALSE,
        "blocked" bool NOT NULL DEFAULT FALSE,
        "email" VARCHAR NOT NULL UNIQUE,
        "admin" bool NOT NULL DEFAULT FALSE,
        "location" VARCHAR(50) NOT NULL DEFAULT 'Vietnam'::CHARACTER VARYING,
        "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );