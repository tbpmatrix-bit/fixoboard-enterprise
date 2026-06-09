# cPanel Deployment Guide (Beginner Friendly)

This guide explains how to run, configure, and deploy this project on cPanel.

## 1. What this project is

- This is a **React + Vite** frontend project.
- It builds into static files (`index.html`, JS, CSS assets).
- You deploy the built files from the `dist/` folder to cPanel.
- Routing uses `HashRouter`, so URLs work like: `https://yourdomain.com/#/about`.
- No server-side Node.js runtime is required on cPanel for hosting this app.

## 2. Requirements

Install these on your local computer first:

1. Node.js LTS (recommended: Node 20 or newer)
2. npm (comes with Node.js)
3. A code editor (VS Code recommended)
4. cPanel login access for your domain

Check installation:

```bash
node -v
npm -v
```

## 3. Open the project locally

1. Download/unzip this project.
2. Open terminal inside project root:
   - Folder should contain `package.json`.
3. Install dependencies:

```bash
npm install
```

## 4. Configure environment variables

This project supports optional AI chat integration.

1. In project root, create `.env.local`.
2. Add:

```env
 VITE_GEMINI_API_KEY=your_actual_key_here
```

Important:

- If you do not set `VITE_GEMINI_API_KEY`, the website still works.
- In that case, chat widget shows fallback support/quote behavior.

## 5. Run the project locally (development)

```bash
npm run dev
```

Then open the URL shown in terminal (usually `http://localhost:3000`).

## 6. Create production build

Run:

```bash
npm run build
```

After success, a `dist/` folder is created.

## 7. (Recommended) Test production build before upload

```bash
npm run preview
```

Open the preview URL from terminal and confirm pages work.

## 8. Prepare files for cPanel upload

You must upload the **contents inside** `dist/`, not the `dist` folder itself.

`dist/` usually contains:

- `index.html`
- `assets/` folder

## 9. Deploy to cPanel using File Manager

1. Login to cPanel.
2. Open **File Manager**.
3. Open your document root:
   - Main domain: `public_html`
   - Addon/subdomain: its assigned document root folder
4. (Recommended) Backup existing live files first.
5. Delete old app files from target folder (or move them to backup folder).
6. Upload your built files:
   - Upload `index.html`
   - Upload `assets/` folder
7. Confirm `index.html` is directly inside document root.

Expected structure in document root:

```text
public_html/
  index.html
  assets/
    index-xxxxx.js
    ...
```

## 10. Alternative deploy method (ZIP)

1. From local system, open `dist/`.
2. Select all files inside `dist/` and create a zip (for example: `site.zip`).
3. Upload zip to document root in cPanel.
4. Extract zip there.
5. Delete zip after extraction.

## 11. Verify deployment

1. Open your domain in browser.
2. Hard refresh:
   - Windows: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
3. Visit a few routes, for example:
   - `/#/`
   - `/#/about`
   - `/#/products`
4. Check browser console for errors.

## 12. How to update site later

Every time you change code:

1. Run `npm run build` again.
2. Upload fresh `dist/` contents.
3. Replace old `index.html` and `assets/`.
4. Hard refresh browser/CDN cache.

## 13. Common issues and fixes

### Issue: White page after upload

Fix:

1. Ensure `index.html` is inside document root (not nested in another folder).
2. Ensure `assets/` folder exists next to `index.html`.
3. Re-upload fresh `dist/` output.

### Issue: 404 for JS/CSS assets

Fix:

1. Confirm `assets/*` files are uploaded completely.
2. Do not rename files inside `assets`.
3. Clear browser cache and retry.

### Issue: Website opens old version

Fix:

1. Hard refresh browser.
2. If Cloudflare/CDN is enabled, purge cache.
3. Replace old build files in cPanel with latest `dist/`.

### Issue: Chat AI not answering

Fix:

1. Set `VITE_GEMINI_API_KEY` before running `npm run build`.
2. Rebuild and redeploy.
3. If still missing, chat fallback mode is expected.

## 14. Security note (important)

This project currently has frontend-only admin authentication in:

- `app/admin/login/page.tsx`

Credentials are hardcoded client-side, which is not secure for real production admin protection.
For true security, use a backend authentication system with server-side session/token validation.

## 15. Quick deployment checklist

1. `npm install`
2. Create `.env.local` (optional AI key)
3. `npm run build`
4. Upload **contents of `dist/`** to cPanel document root
5. Confirm `index.html` + `assets/` are in correct place
6. Hard refresh and test routes
