CREATE TABLE
    public. "reports" (
        "report_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "solution_id" uuid NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "reports_solutions_solution_id_fk" FOREIGN KEY ("solution_id") REFERENCES "solutions" ("solution_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );