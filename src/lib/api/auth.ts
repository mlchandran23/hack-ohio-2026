type AuthResponse = {
	error?: string;
};

async function postAuthRequest(path: string, email: string, password: string, name?: string): Promise<void> {
	const response = await fetch(`/api/${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});

	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as AuthResponse | null;
		throw new Error(body?.error ?? "Authentication request failed");
	}
}

export function login(email: string, password: string): Promise<void> {
	return postAuthRequest("login", email, password);
}

export function createAccount(name: string, email: string, password: string): Promise<void> {
	return postAuthRequest("signup", email, password, name);
}