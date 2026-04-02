const BASE_URL = "http://localhost:3333/api";

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const session = localStorage.getItem('user_session');
    const token = session ? JSON.parse(session).token : null;

    const headers = new Headers(options?.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    return await response.json();
};