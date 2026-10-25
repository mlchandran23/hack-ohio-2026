type AuthResponse = {
	error?: string;
};

export type AuthenticatedStudent = {
	id: string;
	name: string;
	email: string;
	major: string | null;
	bio: string | null;
};

type LoginResponse = AuthResponse & {
	student: AuthenticatedStudent;
};

async function postAuthRequest<T>(path: string, email: string, password: string, name?: string): Promise<T> {
	const response = await fetch(`/api/${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});

	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as AuthResponse | null;
		throw new Error(body?.error ?? "Authentication request failed");
	}
	return response.json() as Promise<T>;
}

export function login(email: string, password: string): Promise<LoginResponse> {
	return postAuthRequest<LoginResponse>("login", email, password);
}

export function createAccount(name: string, email: string, password: string): Promise<void> {
	return postAuthRequest<void>("signup", email, password, name);
}