CREATE TABLE
    public."difficulties"
(
    "name"   VARCHAR NOT NULL UNIQUE,
    "points" int4    NOT NULL UNIQUE CHECK ("points" >= 0)
);

-- Add Some Default Difficulty
INSERT INTO public."difficulties" ("name", points)
VALUES ('newbie', 10),
       ('junior', 20),
       ('intermediate', 30),
       ('advanced', 40),
       ('guru', 50),
       ('marked_as_helpful', 60);