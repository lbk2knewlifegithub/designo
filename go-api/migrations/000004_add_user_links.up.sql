CREATE TABLE
    public. "user_links" (
        user_id uuid NOT NULL,
        twitter VARCHAR NULL,
        dev_to VARCHAR NULL,
        hashnode VARCHAR NULL,
        twitch VARCHAR NULL,
        stack_over_flow VARCHAR NULL,
        gitlab VARCHAR NULL,
        free_code_camp VARCHAR NULL,
        medium VARCHAR NULL,
        youtube VARCHAR NULL,
        codewars VARCHAR NULL,
        linked_in VARCHAR NULL,
        github VARCHAR NULL,
        codepen VARCHAR NULL,
        CONSTRAINT "user_links_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
        ON
        DELETE CASCADE
            ON
        UPDATE CASCADE
    );