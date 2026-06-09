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

Pushes to `main` run `.github/workflows/deploy.yml`:

1. `npm ci` and `npm run build`
2. Authenticate via Workload Identity Federation (`WIF_PROVIDER_PROD`, `CICD_SA_EMAIL_PROD`)
3. `firebase deploy --only hosting --project caira-prod`

Manual deploy (requires Firebase CLI and GCP credentials):

```bash
npm run build
firebase deploy --only hosting --project caira-prod
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
