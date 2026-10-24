
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    major TEXT,
    bio TEXT
);

CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL
        CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    status TEXT NOT NULL
        CHECK (status IN ('In Progress', 'Completed')),
    technologies TEXT NOT NULL DEFAULT '[]',
    skills_learned TEXT NOT NULL DEFAULT '[]',
    starter_tasks TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS mentors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    expertise TEXT,
    bio TEXT
);

CREATE TABLE IF NOT EXISTS project_students (
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, student_id)
);

CREATE TABLE IF NOT EXISTS project_mentors (
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    mentor_id TEXT NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, mentor_id)
);
