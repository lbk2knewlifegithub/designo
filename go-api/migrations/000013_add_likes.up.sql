CREATE TABLE
    public. "likes" (
        "user_id" uuid NOT NULL,
        "solution_id" uuid NOT NULL,
        -- link solution_id to table solutions
        CONSTRAINT "likes_solutions_solution_id_fk" 
        FOREIGN KEY ("solution_id") 
        REFERENCES "solutions" ("solution_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        -- link user_it to table users
        CONSTRAINT "likes_users_user_id_fk" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users" ("user_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        -- make user_id and solution is primary key
        CONSTRAINT "likes_user_id_solution_id_pk" PRIMARY KEY ("user_id", "solution_id")
    );