# Namaa Finance | نماء للمال

An upgraded version of your saved Namaa app, with optional password protection and additional finance tools. Read **START_HERE.md** for installation and password setup, **SECURITY.md** for the protection model, and **VALIDATION.md** for verification results.

Runtime: plain HTML, CSS and JavaScript; no external libraries, analytics, advertising, bank connection or cloud backend. Serve from HTTPS or localhost.

```bash
python3 -m http.server 4173
node --test tests/*.test.cjs
```

Open http://localhost:4173. The browser tests start their own temporary server and use fictitious data in isolated browser profiles. They require development-only Playwright:

```bash
npm install --no-save playwright
npx playwright install chromium
node tests/browser.cjs
```

Optional test environment variables: `NAMAA_BROWSER_PATH` for an installed Chromium executable; `NAMAA_TEST_OUTPUT` for a temporary screenshot and results directory.

`app.js` retains the original interface and forms. `enhancements.js` adds the lock controller, settings, transfers, bills and filters. `vault.js` handles encryption and conflict-checked persistence. `finance-core.js` handles validation, calendar arithmetic and financial calculations. The service worker caches only app assets.
