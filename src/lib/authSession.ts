export type StudentSession = {
	id: string;
	name: string;
	email: string;
	major?: string | null;
	bio?: string | null;
};

const SESSION_KEY = "buckeye-bridge-student";
const SESSION_EVENT = "buckeye-bridge-auth-change";

export function getStudentSession(): StudentSession | null {
	const storedSession = localStorage.getItem(SESSION_KEY);
	if (!storedSession) return null;

	try {
		return JSON.parse(storedSession) as StudentSession;
	} catch {
		localStorage.removeItem(SESSION_KEY);
		return null;
	}
}

export function setStudentSession(session: StudentSession): void {
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearStudentSession(): void {
	localStorage.removeItem(SESSION_KEY);
	window.dispatchEvent(new Event(SESSION_EVENT));
}

export function subscribeToStudentSession(callback: () => void): () => void {
	window.addEventListener(SESSION_EVENT, callback);
	window.addEventListener("storage", callback);
	return () => {
		window.removeEventListener(SESSION_EVENT, callback);
		window.removeEventListener("storage", callback);
	};
}