# Fixoboard Enterprise

React + Vite frontend for the Fixoboard website.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` (optional, only for AI chat):
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Production Build

```bash
npm run build
```

Build output will be in `dist/`.

## Deploy To cPanel (Static Hosting)

1. Run `npm run build` on your local machine.
2. In cPanel, open `File Manager`.
3. Go to your target folder:
   - Main domain: `public_html`
   - Subdomain/addon domain: that domain's document root
4. Upload the **contents inside** `dist/` (not the `dist` folder itself) into that document root.
5. Ensure `index.html` is directly inside the document root.
6. Open your domain and verify pages load.

Notes:
- This app is built as a static site and is ready for cPanel file hosting.
- AI chat needs `VITE_GEMINI_API_KEY` at build time. If not provided, the site still works and chat shows contact/quote fallback.
