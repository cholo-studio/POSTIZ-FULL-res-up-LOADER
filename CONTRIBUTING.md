# Contributing to Postiz Full-Res Uploader

Welcome, and thanks for your interest! This is an MIT-licensed project by [Cholo Studio](https://github.com/cholo-studio). Contributions of all kinds are appreciated — bug fixes, features, tests, and documentation.

---

## Local Setup

1. **Clone** the repo and install dependencies:

   ```bash
   git clone https://github.com/cholo-studio/postiz-fullres-uploader.git
   cd postiz-fullres-uploader
   npm install
   ```

2. **Copy the example env file** and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   The app needs a **Vercel Blob token**, a **Vercel KV** store, and a **Postiz Public API key** to fully run. Tests and the production build work without any of these — you only need them to exercise the upload flow end-to-end.

3. **Start the dev server**:

   ```bash
   npm run dev
   # → http://localhost:3000
   ```

---

## Running Checks

Both of these must pass before you open a PR:

```bash
npm test        # runs 32 unit tests via Vitest
npm run build   # Next.js production build
```

These are also the two commands the CI workflow runs on every push and PR.

---

## Branch and PR Workflow

- Fork the repo (or create a branch if you have write access).
- Keep PRs **focused** — one logical change per PR.
- Write a clear description of *what* the change does and *why*.
- If your PR fixes a bug, reference the issue: `Fixes #123`.
- Make sure `npm test` and `npm run build` are green locally before pushing.

---

## Code Style

- **TypeScript strict mode** is enabled — no `any`, no type assertions unless unavoidable.
- Keep functions **small and testable**. Pure library functions (in `lib/`) take their dependencies as arguments so they can be tested without mocks.
- Follow existing file and naming conventions you see in the codebase.
- No linter is enforced yet, but match the style of the surrounding code.

---

## Reporting Bugs or Ideas

Please [open a GitHub issue](https://github.com/cholo-studio/postiz-fullres-uploader/issues). Include steps to reproduce for bugs, and a brief rationale for feature requests.

---

MIT License — contributions you submit are licensed under the same terms.
