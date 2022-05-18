ALTER TABLE
    IF EXISTS "reports" DROP CONSTRAINT IF EXISTS "reports_solutions_solution_id_fk";

DROP TABLE IF EXISTS "reports";