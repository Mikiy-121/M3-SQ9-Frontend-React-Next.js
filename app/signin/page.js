export default async function SignInPage({ searchParams }) {
  const params = await searchParams;

  const next = params.next || "/";

  return (
    <main>
      <h1>Sign in</h1>

      <form action="/api/signin" method="post">
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        <input
          type="hidden"
          name="next"
          value={next}
        />

        <button type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
