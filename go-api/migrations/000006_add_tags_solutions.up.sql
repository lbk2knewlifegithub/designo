CREATE TABLE
    public. "tags_solutions" (
        "tag_id" uuid NOT NULL,
        "solution_id" uuid NOT NULL,
        CONSTRAINT "tags_solutions_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags" ("tag_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT "tags_solutions_solutions_solution_id_fk" FOREIGN KEY ("solution_id") REFERENCES "solutions" ("solution_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT "tags_solutions_tag_id_solution_fk" PRIMARY KEY ("tag_id", "solution_id")
    );