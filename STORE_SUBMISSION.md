# Microsoft Store release handoff

## Delivery model

This project is an installable PWA. Microsoft supports publishing PWAs to the Microsoft Store; the packaged app is submitted as an MSIX package. This route preserves the fast, local-first application while giving Windows users normal Store discovery, installation, and updates.

## What is ready in this project

- Valid web-app manifest, standalone display mode, custom icon, and service worker.
- A bilingual English/Arabic interface, including right-to-left layout support.
- Local-first financial records, JSON backup/restore, and CSV export.
- Store-facing identity: `Namaa Finance | نماء للمال` (a working name that should be checked for availability before submission).

## Publisher steps that require your Microsoft account

1. Reserve the final application name in Microsoft Partner Center.
2. Host this PWA at a stable public HTTPS address. A Store PWA needs a public URL; a local `localhost` build cannot be submitted.
3. Use PWABuilder to validate the hosted PWA and create the Microsoft Store / MSIX package.
4. In Partner Center, create the Store listing, upload the package, and add current screenshots, description, support contact, and privacy-policy URL.
5. Complete age rating, markets, pricing, and policy declarations; then submit for certification.

## Recommended Store listing copy

### English short description

Track income, expenses, budgets, goals, and private financial records in one bilingual workspace.

### Arabic short description

سجّل الدخل والمصروفات والميزانيات والأهداف والسجلات المالية الخاصة في مساحة واحدة ثنائية اللغة.

### Product highlights

- Add income and expenses in seconds.
- Understand your monthly cash flow, spending categories, and account balances.
- Create monthly budgets and savings goals.
- Keep recurring payments visible before they are due.
- Store private financial references alongside your transactions.
- Keep the first version local to the device, and export a full backup whenever needed.

## Required release materials

- Final app name and publisher identity.
- Public HTTPS production URL.
- Store package generated from the hosted PWA.
- Desktop and mobile screenshots captured from the finished app.
- Privacy policy that accurately describes on-device storage, backups, analytics, support contacts, and any future cloud or bank-connection features.
- Support email address and website.
- Finalised app icon and Store artwork generated from the provided vector icon.

## Production safeguards before a paid/public financial release

- Add a tested privacy policy and clear in-app disclosure of local versus cloud storage.
- Perform accessibility, security, and Store certification testing on Windows 10 and Windows 11.
- If cloud sync is added: use user authentication, encrypted transport, encrypted data storage, account recovery, and a security review.
- Do not claim bank-grade encryption, bank connectivity, investment advice, tax advice, or automatic currency conversion unless those capabilities are actually implemented and validated.

## Useful official Microsoft references

- Microsoft Learn: publish a PWA to the Microsoft Store.
- Microsoft Learn: package a Windows app with MSIX.
- Microsoft Learn: Windows app distribution paths.
