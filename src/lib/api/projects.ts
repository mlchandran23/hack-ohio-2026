import type { Project, Student } from "../../types/project";

const API_BASE = "/api";

export interface CreateProjectInput {
  studentId: string;
  title: string;
  description: string;
  category: string;
  difficulty: Project["difficulty"];
  technologies: string[];
  skillsLearned: string[];
  starterTasks: string[];
}

export interface StudentProfileInput {
  major: string;
  bio: string;
}

export type ProjectAccessRequestResult =
  | { matched: false; added: false }
  | { matched: true; added: boolean; project: Project };

async function request<T>(path: string): Promise<T> {
const response = await fetch(`${API_BASE}${path}`);

if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${response.status}`);
}

return response.json() as Promise<T>;
}

async function postRequest<T>(path: string, body: unknown): Promise<T> {
const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

if (!response.ok) {
    const errorBody = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(errorBody?.error ?? `Request failed: ${response.status}`);
}

return response.json() as Promise<T>;
}

export function getProjects(): Promise<Project[]> {
return request<Project[]>("/projects");
}

export function createProject(input: CreateProjectInput): Promise<Project> {
return postRequest<Project>("/projects", input);
}

export function submitProjectAccessRequest(
  projectId: string,
  email: string,
): Promise<ProjectAccessRequestResult> {
return postRequest<ProjectAccessRequestResult>(
    `/projects/${encodeURIComponent(projectId)}/access-request`,
    { email },
);
}

export function getProjectById(id: string): Promise<Project> {
return request<Project>(`/projects/${encodeURIComponent(id)}`);
}

export function getStudentById(id: string): Promise<Student & { projects: Project[] }> {
return request<Student & { projects: Project[] }>(
    `/students/${encodeURIComponent(id)}`,
);
}

export function updateStudentProfile(
  id: string,
  profile: StudentProfileInput,
): Promise<Student> {
return patchRequest<Student>(`/students/${encodeURIComponent(id)}`, profile);
}

async function patchRequest<T>(path: string, body: unknown): Promise<T> {
const response = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

if (!response.ok) {
    const errorBody = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(errorBody?.error ?? `Request failed: ${response.status}`);
}

return response.json() as Promise<T>;
}