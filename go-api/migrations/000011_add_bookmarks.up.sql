CREATE TABLE
    public. "bookmarks" (
        "user_id" uuid NOT NULL, 
        "solution_id" uuid NOT NULL,
        CONSTRAINT "bookmarks_solutions_solution_id_fk" 
        FOREIGN KEY ("solution_id") 
        REFERENCES "solutions" ("solution_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT "bookmarks_users_user_id_fk" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users" ("user_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );

