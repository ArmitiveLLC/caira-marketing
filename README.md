# Caira Marketing Site

Static marketing site for [caira.care](https://caira.care), built with Astro 5 and Tailwind CSS. Deployed to Firebase Hosting on the `caira-prod` project.

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
5. Site ID: **`caira-care`** (must match `firebase.json` → `hosting.site`)
6. After the first deploy, open site **caira-care** → **Add custom domain** → `caira.care`

Preview URL after deploy: `https://caira-care.web.app`

CLI alternative to create the site (once):

```bash
npm exec firebase hosting:sites:create caira-care --project caira-prod
```

| Property | Marketing | Portal |
| -------- | --------- | ------ |
| Hosting site | `caira-care` | `armitive-web` (if used) |
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
2. `firebase deploy --only hosting:caira-care --project caira-prod` using `FIREBASE_TOKEN`

Manual deploy (requires Firebase CLI and GCP credentials):

```bash
npm run build
npx firebase deploy --only hosting:caira-care --project caira-prod
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

## Brand colors

| Name | Hex |
| ---- | --- |
| Teal | `#5CA19C` |
| Navy | `#3C4C6C` |
| Paper | `#FAFBF9` |
| Mint | `#B8DCC0` |

## Structure

```
src/
  components/   Header, Footer
  content/legal/  privacy, support, terms (markdown)
  layouts/      BaseLayout
  pages/        index, privacy, support, terms
public/         logo.png, favicon.png
```
