CREATE TABLE
    public."challenges" (
        "challenge_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "steps" VARCHAR NOT NULL,
        "ideas" VARCHAR NOT NULL,
        "type" VARCHAR NOT NULL,
        "title" VARCHAR NOT NULL,
        "languages" JSONB NOT NULL,
        "description" VARCHAR NOT NULL,
        "starter_url" VARCHAR NOT NULL,
        "brief" VARCHAR NOT NULL,
        "hero_image" VARCHAR NOT NULL,
        "difficulty" VARCHAR(50) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );