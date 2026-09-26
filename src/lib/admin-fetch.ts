/**
 * Authenticated fetch for admin API routes (session cookie).
 */
export function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init?.headers || {}),
    },
  })
}
