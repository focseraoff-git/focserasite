focserasite

Setup
-----

This project uses Supabase for backend data. To run locally you must provide the Supabase URL and anon key via Vite environment variables.

1. Copy `.env.example` to `.env` at the repository root.
2. Fill in your Supabase project values:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Vite exposes variables that start with `VITE_` to the client code. `src/lib/supabase.ts` reads these variables and will throw an error at startup if they're missing.

Security note: Never commit service_role keys or other secret server-side credentials to the frontend repo.
