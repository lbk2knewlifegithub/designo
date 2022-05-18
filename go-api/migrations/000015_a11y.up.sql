CREATE TABLE
    public. "a11y" (
        "report_id" uuid NOT NULL,
        "level" VARCHAR(50) NOT NULL,
        "title" VARCHAR NOT NULL,
        "context" VARCHAR NOT NULL,
        "help" VARCHAR,
        CONSTRAINT "a11y_reports_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "reports" ("report_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );