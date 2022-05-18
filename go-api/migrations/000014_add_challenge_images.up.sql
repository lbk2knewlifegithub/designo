CREATE TABLE
    public. "challenge_images" (
        "image_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "challenge_id" uuid NOT NULL,
        "title" VARCHAR NOT NULL, "preview" VARCHAR NOT NULL, "design" VARCHAR NOT NULL,
        CONSTRAINT "challenge_images_challenges_challenge_id_fk" 
        FOREIGN KEY ("challenge_id") 
        REFERENCES "challenges" ("challenge_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
