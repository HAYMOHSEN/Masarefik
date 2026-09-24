# Namaa Finance | نماء للمال

Namaa Finance is a bilingual, local-first personal finance application designed for a Microsoft Store release. It runs as an installable Progressive Web App (PWA), so Windows users can download it from the Store and use it like a desktop app.

## What is included

- Arabic (RTL) and English interfaces with an in-app language switch.
- Income and expense tracking, categories, accounts, notes, and recurring payments.
- Current balance, monthly cash flow, categories, budgets, goals, and financial reports.
- A private financial vault for details such as insurance, loans, tax notes, contracts, and other financial references.
- On-device data storage by default, with JSON backup/restore and CSV export.
- Responsive Windows desktop and mobile layouts, keyboard support, an offline cache, and a custom app icon.

## Run locally

Serve this directory with any local static web server, then open `index.html` in a modern Chromium-based browser. The service worker enables offline behavior only when the app is served from `localhost` or HTTPS.

Example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Data model and privacy

The initial build stores records in the app's local browser storage on the user's device. It does not connect to a bank, share records, or send financial data to a backend. Users should download a backup before changing devices or clearing application data.

For a production cloud-sync edition, add an authenticated backend, end-to-end encryption design, account recovery, a privacy policy, and a security review before handling sensitive data.

## Store-release handoff

See [STORE_SUBMISSION.md](STORE_SUBMISSION.md) for the Microsoft Store preparation path, release checklist, and items that require the publisher's Partner Center account.
