CREATE TABLE
    public."html_validators" (
        "report_id" uuid NOT NULL,
        "level" VARCHAR(50) NOT NULL,
        "title" VARCHAR NOT NULL,
        "context" VARCHAR NOT NULL,
        "help" VARCHAR NULL,
        CONSTRAINT "html_validators_reports_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "reports" ("report_id")
        ON DELETE CASCADE
        ON
        UPDATE CASCADE
    );