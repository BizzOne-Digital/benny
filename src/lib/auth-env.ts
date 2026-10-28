// Auth.js builds callback URLs from AUTH_URL / NEXTAUTH_URL when set. A wrong value (localhost,
// missing https://, apex vs www) makes every /api/auth/* request return 400 "Bad request.".
// With trustHost the real request host is used, so ignore those variables entirely.
delete process.env.AUTH_URL
delete process.env.NEXTAUTH_URL

export {}
