# Caira Marketing Site

Static marketing site for [caira.care](https://caira.care), built with Astro 5 and Tailwind CSS. Deployed to Firebase Hosting on the `caira-prod` project.

**Brand copy:** Official slogan *Care — simplified, connected, intelligent.* — see [brand_guidelines.md](../caira-backend/platform_docs/brand_guidelines.md) and [CAIRA_CUSTOMER_PITCH_SOURCE.md](../caira-backend/platform_docs/CAIRA_CUSTOMER_PITCH_SOURCE.md).

## Development

Requires **Node.js 24 LTS** (see `.nvmrc`).

**Windows (recommended):**
```powershell
winget install OpenJS.NodeJS.LTS
```
Close and reopen the terminal, then `node -v` should show `v24.x`.

**macOS / Linux:** [nvm](https://github.com/nvm-sh/nvm) — `nvm install 24 && nvm use 24`

**Optional — multiple Node versions on Windows:** install [nvm-windows](https://github.com/coreybutler/nvm-windows), then `nvm install 24` and `nvm use 24`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview  # preview production build
```

Do **not** run `npm audit fix --force` — it downgrades `@astrojs/tailwind` and breaks the build. The reported audit items are dev-only transitive deps; safe to ignore for this static site.

## Deploy

### One-time Firebase setup (caira-prod)

Marketing uses a **dedicated Hosting site** — separate from the portal web app (`armitive-web`) and from `app.caira.care` (Cloud Run).

You do **not** need a new Firebase Web App (no SDK). Create a separate Hosting site:

1. [Firebase Console](https://console.firebase.google.com) → project **caira-prod**
2. **Build → Hosting**
3. If Hosting is not enabled yet, click **Get started** once
4. Click **Add another site**
5. Site ID: **`caira-care-eaf48`** (must match `firebase.json` → `hosting.site`; IDs are globally unique — `caira-care` was taken)
6. After the first deploy, open site **caira-care-eaf48** → **Add custom domain** → `caira.care`

Preview URL after deploy: `https://caira-care-eaf48.web.app`

CLI alternative to create the site (once):

```bash
npx firebase hosting:sites:create caira-care-eaf48 --project caira-prod
```

| Property | Marketing | Portal |
| -------- | --------- | ------ |
| Hosting site | `caira-care-eaf48` | `caira-prod` / `armitive-web` |
| Custom domain | `caira.care` | `app.caira.care` (Cloud Run) |
| Firebase Web App | None (static site) | `armitive-web` (Auth SDK) |

### GitHub secret: `FIREBASE_TOKEN`

Firebase CLI does **not** accept Workload Identity credentials. Use a CI token instead (one-time setup):

```bash
npm install -g firebase-tools
firebase login:ci
```

Sign in with a Google account that has **Firebase Hosting Admin** on `caira-prod`. Copy the token, then:

```bash
gh secret set FIREBASE_TOKEN -R ArmitiveLLC/caira-marketing
```

Or paste it in GitHub → **caira-marketing → Settings → Secrets → Actions → New secret** → name `FIREBASE_TOKEN`.

### CI workflow

Pushes to `main` run `.github/workflows/deploy.yml`:

1. `npm ci` and `npm run build`
2. `npm ci` in `functions/` and compile TypeScript (via Firebase predeploy)
3. `firebase deploy --only hosting:caira-care-eaf48,functions:pilotRequest --project caira-prod` using `FIREBASE_TOKEN`

Manual deploy (requires Firebase CLI and GCP credentials):

```bash
npm run build
npx firebase deploy --only hosting:caira-care-eaf48,functions:pilotRequest --project caira-prod
```

### Pilot inquiry form (Resend)

The **Ask about a pilot** form posts to `/api/pilot`, rewritten to the `pilotRequest` Cloud Function, which sends email via [Resend](https://resend.com) to **info@caira.care**.

**One-time setup (caira-prod):**

```bash
# Resend API key (same key used for noreply@caira.care is fine)
firebase functions:secrets:set RESEND_API_KEY --project caira-prod
```

Ensure `noreply@caira.care` is verified in Resend and the domain `caira.care` has SPF/DKIM configured. Emails are sent to **info@caira.care** by default (`PILOT_EMAIL` param).

**Local dev:** Astro dev does not run the function. Either:

1. `firebase emulators:start --only hosting,functions` from repo root (after `npm run build`), or
2. Set `PUBLIC_PILOT_API_URL` in `.env` to the deployed function URL (see `.env.example`).

```bash
cd functions && npm ci && npm run build
```

## App & store URLs cheat sheet

Use these when updating store listings, emails, or legal pages.

| Resource | URL |
| -------- | --- |
| Marketing site | https://caira.care |
| Web app (sign in) | https://app.caira.care |
| Privacy policy | https://caira.care/privacy |
| Support | https://caira.care/support |
| Terms | https://caira.care/terms |
| Support email | support@caira.care |

### Mobile app stores

| Platform | Identifier | Store URL (update when live) |
| -------- | ---------- | ---------------------------- |
| iOS | Bundle ID `com.armitive.caira` | https://apps.apple.com/app/caira/id0000000000 |
| Android | Package `com.armitive.caira` | https://play.google.com/store/apps/details?id=com.armitive.caira |

Replace the iOS App Store ID placeholder once the app is approved. The Android URL works as soon as the listing is published under that package name.

## Brand colors (Sunrise v2)

| Name | Hex | Role |
| ---- | --- | ---- |
| Coral | `#EE6C4D` | Primary CTA |
| Amber | `#F4A340` | Gradient mid / accents |
| Teal | `#45B3A4` | Secondary CTA / links |
| Navy | `#3C4C6C` | Headings / structure |
| Ink | `#1A2233` | Body text |
| Canvas | `#F3EEE6` | Page background |
| Paper | `#FDFAF6` | Soft fills / alternate light surfaces |
| Mint | `#B8DCC0` | Soft AI / positive fills |
| Cyan | `#4CCBC8` | Live / AI pulse |

## Structure

```
src/
  components/   Header, Footer
  content/legal/  privacy, support, terms (markdown)
  layouts/      BaseLayout
  pages/        index, privacy, support, terms
public/         logo.png, favicon.png
```
