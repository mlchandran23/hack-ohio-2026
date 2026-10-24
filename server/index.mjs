
import express from "express";
import { DatabaseSync } from "node:sqlite";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const rootDirectory = join(serverDirectory, "..");
const dataDirectory = join(rootDirectory, "data");

mkdirSync(dataDirectory, { recursive: true });

const db = new DatabaseSync(join(dataDirectory, "buckeye-bridge.db"));

db.exec(readFileSync(join(serverDirectory, "schema.sql"), "utf8"));
const studentColumns = new Set(db.prepare("PRAGMA table_info(students)").all().map((column) => column.name));
for (const [column, definition] of [
  ["email", "TEXT"],
  ["password", "TEXT"],
]) {
  if (!studentColumns.has(column)) {
    db.exec(`ALTER TABLE students ADD COLUMN ${column} ${definition}`);
  }
}
if (studentColumns.has("password_hash") && studentColumns.has("password_salt")) {
  db.exec(`
    UPDATE students
    SET password = password_salt || ':' || password_hash
    WHERE password IS NULL
      AND password_hash IS NOT NULL
      AND password_salt IS NOT NULL
  `);
}
db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS students_email_unique
  ON students (email COLLATE NOCASE)
  WHERE email IS NOT NULL
`);

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

app.post("/api/signup", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const passwordSalt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex");
  const storedPassword = `${passwordSalt}:${passwordHash}`;

  try {
    db.prepare(`
      INSERT INTO students (id, name, email, password)
      VALUES (?, ?, ?, ?)
    `).run(`student-${randomUUID()}`, name, email, storedPassword);
  } catch (error) {
    if (error.code === "ERR_SQLITE_ERROR" && error.message.includes("students.email")) {
      return res.status(409).json({ error: "An account with that email already exists" });
    }
    throw error;
  }

  res.status(201).json({ message: "Account created" });
});

app.post("/api/login", (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const student = db.prepare(`
    SELECT id, name, email, password
    FROM students
    WHERE email = ?
  `).get(email);

  if (!student?.password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const [passwordSalt, passwordHash] = student.password.split(":");
  if (!passwordSalt || !passwordHash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const submittedHash = scryptSync(password, passwordSalt, 64);
  const storedHash = Buffer.from(passwordHash, "hex");
  if (!timingSafeEqual(submittedHash, storedHash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    student: { id: student.id, name: student.name, email: student.email },
  });
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
