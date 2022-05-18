CREATE TABLE public."tags_users" (
    "tag_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    -- Table tags_users and Table users are linked by the foreign key user_id
    CONSTRAINT "tags_users_users_user_id_fk" 
    FOREIGN KEY ("user_id") 
    REFERENCES "users" ("user_id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    -- Table tags_users and Table tags are linked by the foreign key tag_id
    CONSTRAINT "tags_users_tags_tag_id_fk" 
    FOREIGN KEY ("tag_id") 
    REFERENCES "tags" ("tag_id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    -- Constraint to ensure that a tag can only be linked to a user once
    CONSTRAINT "tags_users_tag_id_user_id_pk" PRIMARY KEY ("tag_id", "user_id")
);