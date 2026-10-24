import type { Project, Student } from "../../types/project";

const API_BASE = "/api";

async function request<T>(path: string): Promise<T> {
const response = await fetch(`${API_BASE}${path}`);

if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${response.status}`);
}

return response.json() as Promise<T>;
}

export function getProjects(): Promise<Project[]> {
return request<Project[]>("/projects");
}

export function getProjectById(id: string): Promise<Project> {
return request<Project>(`/projects/${encodeURIComponent(id)}`);
}

export function getStudentById(id: string): Promise<Student & { projects: Project[] }> {
return request<Student & { projects: Project[] }>(
    `/students/${encodeURIComponent(id)}`,
);
}