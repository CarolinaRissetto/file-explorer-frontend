const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as { error?: string }).error ?? res.statusText;
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export { API_BASE, request };
