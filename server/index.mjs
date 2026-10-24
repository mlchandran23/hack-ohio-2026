
import express from "express";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const rootDirectory = join(serverDirectory, "..");
const dataDirectory = join(rootDirectory, "data");

mkdirSync(dataDirectory, { recursive: true });

const db = new DatabaseSync(join(dataDirectory, "buckeye-bridge.db"));

db.exec(readFileSync(join(serverDirectory, "schema.sql"), "utf8"));
db.exec(readFileSync(join(serverDirectory, "seed.sql"), "utf8"));

const app = express();
app.use(express.json());

const getStudents = db.prepare(`
  SELECT s.id, s.name, s.major, s.bio
  FROM students s
  JOIN project_students ps ON ps.student_id = s.id
  WHERE ps.project_id = ?
  ORDER BY s.name
`);

const getMentors = db.prepare(`
  SELECT m.id, m.name, m.expertise, m.bio
  FROM mentors m
  JOIN project_mentors pm ON pm.mentor_id = m.id
  WHERE pm.project_id = ?
  ORDER BY m.name
`);

function formatProject(row) {
  const students = getStudents.all(row.id);
  const mentors = getMentors.all(row.id);

  return {
    ...row,
    technologies: JSON.parse(row.technologies),
    skillsLearned: JSON.parse(row.skillsLearned),
    starterTasks: JSON.parse(row.starterTasks),
    studentIds: students.map((student) => student.id),
    students,
    mentors,
  };
}

const projectColumns = `
  id, title, description, category, difficulty, status,
  technologies, skills_learned AS skillsLearned,
  starter_tasks AS starterTasks
`;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/projects", (_req, res) => {
  const rows = db.prepare(`
    SELECT ${projectColumns}
    FROM projects
    ORDER BY title
  `).all();

  res.json(rows.map(formatProject));
});

app.get("/api/projects/:projectId", (req, res) => {
  const row = db.prepare(`
    SELECT ${projectColumns}
    FROM projects
    WHERE id = ?
  `).get(req.params.projectId);

  if (!row) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(formatProject(row));
});

app.get("/api/students/:studentId", (req, res) => {
  const student = db.prepare(`
    SELECT id, name, major, bio
    FROM students
    WHERE id = ?
  `).get(req.params.studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  
    const projects = db.prepare(`
        SELECT p.id, p.title, p.description, p.category, p.difficulty,
            p.status, p.technologies,
            p.skills_learned AS skillsLearned,
            p.starter_tasks AS starterTasks
        FROM projects p
        JOIN project_students ps ON ps.project_id = p.id
        WHERE ps.student_id = ?
        ORDER BY p.title
    `).all(req.params.studentId);


  res.json({
    ...student,
    projects: projects.map(formatProject),
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Buckeye Bridge API running at http://localhost:${PORT}`);
});
