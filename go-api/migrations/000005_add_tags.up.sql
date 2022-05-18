-- Tags Table
CREATE TABLE
    public. "tags" (
        "tag_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL UNIQUE
    );

-- Insert some Default tags
INSERT INTO public. "tags" ("name")
VALUES ('angular'), ('react'), ('css'), ('js'), ('vue'), ('nuxt'), ('svelte'), ('sveltekit'), ('rust'), ('golang'), ('java'), ('ts'), ('nextjs'), ('jquery'), ('tailwindcss'), ('axios');