--example data
INSERT OR IGNORE INTO students (id, name, major, bio) VALUES
('student-1', 'Alex Morgan', 'Computer Science',
 'Interested in web development and civic technology.'),
('student-2', 'Jordan Lee', 'Information Systems',
 'Enjoys building tools that make campus life easier.'),
('student-3', 'Sam Patel', 'Computer Science',
 'Learning defensive security and network analysis.');

INSERT OR IGNORE INTO mentors (id, name, expertise, bio) VALUES
('mentor-1', 'Taylor Brooks', 'Web Development',
 'Helps students turn early ideas into working applications.'),
('mentor-2', 'Casey Rivera', 'Cybersecurity',
 'Supports students learning security fundamentals.');

INSERT OR IGNORE INTO projects
(id, title, description, category, difficulty, status,
 technologies, skills_learned, starter_tasks)
VALUES
('event-finder', 'Campus Event Finder',
 'A searchable directory that helps students discover campus events.',
 'Web Development', 'Beginner', 'In Progress',
 '["React", "TypeScript", "CSS"]',
 '["Component design", "Search and filtering"]',
 '["Improve the event card", "Add a category filter"]'),

('campus-energy', 'Campus Energy Dashboard',
 'A dashboard for exploring and understanding campus energy usage.',
 'Data Science', 'Intermediate', 'In Progress',
 '["Python", "Data Visualization", "SQL"]',
 '["Data cleaning", "Dashboard design"]',
 '["Improve chart labels", "Document a dataset"]'),

('buckeye-security', 'Buckeye Security Lab',
 'A learning project for exploring defensive security concepts.',
 'Cybersecurity', 'Intermediate', 'In Progress',
 '["Python", "Linux", "Networking"]',
 '["Log analysis", "Network fundamentals"]',
 '["Document a sample log", "Explain a common network port"]'),

('study-buddy', 'Study Buddy',
 'A simple tool for helping students find study partners.',
 'Web Development', 'Beginner', 'Completed',
 '["React", "TypeScript"]',
 '["UI design", "Working with structured data"]',
 '["Improve the empty state", "Add a subject filter"]');

INSERT OR IGNORE INTO project_students (project_id, student_id) VALUES
('event-finder', 'student-1'),
('event-finder', 'student-2'),
('campus-energy', 'student-2'),
('buckeye-security', 'student-3'),
('study-buddy', 'student-1'),
('study-buddy', 'student-3');

INSERT OR IGNORE INTO project_mentors (project_id, mentor_id) VALUES
('event-finder', 'mentor-1'),
('campus-energy', 'mentor-1'),
('buckeye-security', 'mentor-2'),
('study-buddy', 'mentor-1');
