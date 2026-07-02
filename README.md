# Postiz Full-Res Uploader

Upload images and videos to your Postiz media library at full resolution — no downscaling, no Postiz account required for staff.

Built by Cholo Studio · MIT License

---

## Why

Postiz's web UI downscales images and videos on the client side before uploading them to the media library. Large photos (> 4.5 MB) and MP4 videos lose quality before they ever reach Postiz. This tool solves that: staff log in with a shared password, select files in the browser, and the originals are uploaded to the Postiz media library at full resolution via the public API. No individual Postiz accounts needed — one shared password covers the whole team.

## How It Works

```
Browser
  → Vercel Blob (direct client upload, bypasses the 4.5 MB serverless body limit)
  → Serverless function: upload-from-url → Postiz API (full resolution, stored in media library)
  → Thumbnail + metadata saved to Vercel KV (history gallery)
  → Original blob deleted after successful Postiz ingest
```

Key points:

- The browser uploads the original file directly to Vercel Blob — no serverless function receives the binary body, so there is no size limit from function payloads.
- The serverless finalize endpoint passes the Blob URL to Postiz's `upload-from-url` API, which fetches and stores the full-resolution file in the Postiz media library.
- A small JPEG thumbnail is generated client-side and stored separately for the history gallery.
- Once Postiz confirms the upload, the original Blob is deleted; thumbnails remain.

## Features

- Images (JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF) and MP4 video
- Full original resolution — no resampling
- Shared-password login — no individual user accounts
- History gallery with thumbnail preview and "copy Postiz link" button
- Configurable title, brand colors, and UI language (German / English) via environment variables

## Requirements

- A [Postiz](https://postiz.com) account with a **Public API key** (Settings → Public API → Generate)
- A [Vercel](https://vercel.com) account with **Blob** and **KV** storage enabled

## Environment Variables

Set these in `.env.local` for local development, or in **Project → Settings → Environment Variables** on Vercel.

| Variable | Description | Source |
|---|---|---|
| `POSTIZ_API_KEY` | Postiz Public API key | Postiz → Settings → Public API → Generate |
| `POSTIZ_API_URL` | Postiz Public API base URL | Default: `https://api.postiz.com/public/v1` — change only for self-hosted instances |
| `SHARED_PASSWORD` | Team login password | Choose a strong password |
| `SESSION_SECRET` | Long random string for signing the session cookie | `openssl rand -base64 32` (Linux/Mac) or PowerShell: `[Convert]::ToBase64String((1..32 \| % {Get-Random -Max 256}))` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token | Set **automatically** when a Blob store is connected to the project |
| `KV_REST_API_URL` | Vercel KV REST endpoint | Set **automatically** when a KV store is connected — use the `KV` prefix when linking the store so these exact names are populated |
| `KV_REST_API_TOKEN` | Vercel KV access token | Set **automatically** when a KV store is connected (see above) |

### Optional — branding and language (build-time, safe to expose)

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_APP_TITLE` | App title shown in the browser and UI headings | `Postiz Full-Res Uploader` |
| `NEXT_PUBLIC_BRAND_PRIMARY` | Primary brand color (hex) — used for headings and the login button | `#2563eb` |
| `NEXT_PUBLIC_BRAND_ACCENT` | Accent color (hex) — used for the upload dropzone border | `#f59e0b` |
| `NEXT_PUBLIC_APP_LANG` | UI language: `de` (German) or `en` (English) | `de` |

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in .env.local

npm run dev
# → http://localhost:3000
```

Run tests and verify the build:

```bash
npm test        # 32 unit tests
npm run build   # production build check
```

## Deploy to Vercel

1. **Import the repository** — In the Vercel dashboard click **Add New → Project** and import this Git repository. Framework **Next.js** is detected automatically.

2. **Create a Blob store** — Under **Storage → Create Database → Blob**, create a new Blob store and connect it to the project. Vercel sets `BLOB_READ_WRITE_TOKEN` automatically.

3. **Create a KV store** — Under **Storage → Create Database → KV**, create a new KV store and connect it. When prompted to choose environment variable prefix, use **`KV`** so that `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set automatically (the code expects exactly these names).

4. **Set the remaining environment variables** — Under **Project → Settings → Environment Variables**, add:
   - `POSTIZ_API_KEY`
   - `POSTIZ_API_URL` (default: `https://api.postiz.com/public/v1`)
   - `SHARED_PASSWORD`
   - `SESSION_SECRET`
   - Optionally: `NEXT_PUBLIC_APP_TITLE`, `NEXT_PUBLIC_BRAND_PRIMARY`, `NEXT_PUBLIC_BRAND_ACCENT`, `NEXT_PUBLIC_APP_LANG`

5. **Deploy** — Click **Deploy**. Vercel builds the project and serves it at the project URL. Check the build log for errors.

## Security Notes

- **`next@15.1.6`** is pinned and contains known CVEs. Bump to a patched version before running in production (`npm update next` and review the changelog).
- **`@vercel/kv`** is deprecated by Vercel (successor: Upstash SDK directly). The package still works but should be migrated long-term to avoid future compatibility issues.

## License

MIT — see [LICENSE](./LICENSE).

---

## Deutsch

# Postiz Full-Res Uploader

Bilder und Videos in voller Auflösung in die Postiz-Mediathek hochladen — ohne Downscaling und ohne individuelle Postiz-Accounts für das Team.

Entwickelt von Cholo Studio · MIT-Lizenz

---

## Warum

Der Postiz-Webclient skaliert Bilder und Videos vor dem Upload clientseitig herunter. Große Fotos (> 4,5 MB) und MP4-Videos verlieren dadurch an Qualität, bevor sie in der Mediathek landen. Dieses Tool löst das Problem: Das Team-Personal meldet sich mit einem gemeinsamen Passwort an, wählt Dateien im Browser aus, und die Originaldateien werden über die öffentliche Postiz-API in voller Auflösung in die Mediathek übertragen. Individuelle Postiz-Accounts sind nicht erforderlich.

## So funktioniert es

```
Browser
  → Vercel Blob (direkter Client-Upload, umgeht das 4,5-MB-Limit von Serverless-Funktionen)
  → Serverless-Funktion: upload-from-url → Postiz API (volle Auflösung, in der Mediathek gespeichert)
  → Thumbnail + Metadaten in Vercel KV (Verlaufs-Galerie)
  → Original-Blob nach erfolgreichem Postiz-Ingest gelöscht
```

## Funktionen

- Bilder (JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF) und MP4-Video
- Volle Originalauflösung — kein Resampling
- Gemeinsames Team-Passwort — keine individuellen Accounts
- Verlaufs-Galerie mit Thumbnail-Vorschau und „Postiz-Link kopieren"-Schaltfläche
- Konfigurierbarer Titel, Brandfarben und UI-Sprache (Deutsch / Englisch) per Umgebungsvariablen

## Anforderungen

- Ein [Postiz](https://postiz.com)-Konto mit **Public-API-Key** (Einstellungen → Public API → Generate)
- Ein [Vercel](https://vercel.com)-Konto mit **Blob** und **KV** Storage

## Umgebungsvariablen

Lokal in `.env.local` eintragen, auf Vercel unter **Project → Settings → Environment Variables**.

| Variable | Beschreibung | Woher |
|---|---|---|
| `POSTIZ_API_KEY` | Postiz Public-API-Key | Postiz → Einstellungen → Public API → Generate |
| `POSTIZ_API_URL` | Basis-URL der Postiz Public API | Standard: `https://api.postiz.com/public/v1` |
| `SHARED_PASSWORD` | Team-Passwort für den Login | Frei wählbar; sicheres Passwort verwenden |
| `SESSION_SECRET` | Langer Zufallsstring zum Signieren des Session-Cookies | `openssl rand -base64 32` (Linux/Mac) oder PowerShell: `[Convert]::ToBase64String((1..32 \| % {Get-Random -Max 256}))` |
| `BLOB_READ_WRITE_TOKEN` | Vercel-Blob-Zugriffstoken | Wird **automatisch gesetzt**, wenn ein Blob-Store verbunden wird |
| `KV_REST_API_URL` | Vercel-KV-REST-Endpunkt | Wird **automatisch gesetzt**, wenn ein KV-Store mit dem Präfix `KV` verbunden wird |
| `KV_REST_API_TOKEN` | Vercel-KV-Zugriffstoken | Wird **automatisch gesetzt** (siehe oben) |

### Optional — Branding und Sprache (Build-Zeit, öffentlich sicher)

| Variable | Beschreibung | Standard |
|---|---|---|
| `NEXT_PUBLIC_APP_TITLE` | App-Titel in Browser und UI | `Postiz Full-Res Uploader` |
| `NEXT_PUBLIC_BRAND_PRIMARY` | Primäre Brandfarbe (Hex) | `#2563eb` |
| `NEXT_PUBLIC_BRAND_ACCENT` | Akzentfarbe (Hex) — Dropzone-Rahmen | `#f59e0b` |
| `NEXT_PUBLIC_APP_LANG` | UI-Sprache: `de` (Deutsch) oder `en` (Englisch) | `de` |

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
# .env.local befüllen

npm run dev
# → http://localhost:3000
```

Tests und Build-Prüfung:

```bash
npm test        # 32 Unit-Tests
npm run build   # Produktions-Build prüfen
```

## Auf Vercel deployen

1. **Projekt importieren** — In der Vercel-Oberfläche **Add New → Project** klicken und das Git-Repository importieren.
2. **Blob-Store anlegen** — Unter **Storage → Create Database → Blob** einen Blob-Store erstellen und verbinden. Vercel setzt `BLOB_READ_WRITE_TOKEN` automatisch.
3. **KV-Store anlegen** — Unter **Storage → Create Database → KV** einen KV-Store erstellen und verbinden. Als Präfix **`KV`** wählen, damit `KV_REST_API_URL` und `KV_REST_API_TOKEN` automatisch gesetzt werden.
4. **Weitere Variablen eintragen** — Unter **Project → Settings → Environment Variables**: `POSTIZ_API_KEY`, `POSTIZ_API_URL`, `SHARED_PASSWORD`, `SESSION_SECRET` (und optional die Branding-Variablen).
5. **Deployen** — **Deploy** klicken und Build-Log auf Fehler prüfen.

## Sicherheitshinweise

- **`next@15.1.6`** ist eingefroren und enthält bekannte CVEs — vor dem Produktivbetrieb auf eine gepatchte Version aktualisieren.
- **`@vercel/kv`** ist von Vercel deprecated (Nachfolger: Upstash SDK direkt). Das Paket funktioniert weiterhin, sollte aber langfristig migriert werden.

## Lizenz

MIT — siehe [LICENSE](./LICENSE).
