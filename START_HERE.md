# Namaa Finance — secure personal edition

This package upgrades the Namaa app from your saved source, preserving its Arabic/English interface and existing local data key. It starts empty for a new user; no sample financial records are installed.

## Install or update

1. Back up your records from the existing app before updating.
2. Upload this folder's contents to the same project folder that currently contains your app's `index.html`. Upload the files themselves, not the enclosing folder. Keep existing hosting configuration, domain, manifest identity, and Microsoft Store package identity.
3. Use HTTPS for hosting. Reload after upload. If the old interface remains, allow the app update to finish, close and reopen the app, then reload again. Do not clear site data to force an update. Existing records should load automatically when the origin and browser profile remain the same.
4. Enable protection in **Preferences → Password & security → Protect with a password**. The shield banner and top lock button also open setup.
5. Choose and confirm a unique password or passphrase of 12–256 characters. Existing saved records are encrypted in place. There is no default password.
6. Download an encrypted backup and keep its password safely.

For a local preview, install Python, open a terminal in this folder, run `python -m http.server 4173`, and open http://localhost:4173 in Edge or Chrome. Stop the server with Ctrl+C. Opening a ZIP or double-clicking a file is not a supported installation method.

The recovered source is the saved **Namaa_Finance_Store_PWA.zip** package from 24 September 2026. The companion **Namaa_Finance_Microsoft_Store_Assets.zip** contains artwork. If your live app has changed since that saved source, merge those changes before replacing it. No live site, repository or Store listing has been modified.

## New features

| Feature | Behavior |
| --- | --- |
| Password protection | Encrypts on-device saved records; manual lock, inactivity lock, and optional lock when hidden. |
| Protected backups | Full encrypted JSON backups; restores encrypted files and old Namaa JSON backups. |
| Account transfers | Updates both accounts without treating transfers as income or spending. |
| Bills and subscriptions | Weekly, monthly, yearly or one-time schedules. Record payment to add an expense and advance the due date. |
| Bill reserve | Total unpaid occurrences through 30 days, including arrears, plus the recorded balance after those bills. |
| Transaction filters | Combine search, income/expense, account, category and date range. CSV exports the full transaction history. |
| Duplicate entry | Opens a copy for today for you to review and save. |
| Personal settings | Display name, Arabic/English, light/dark theme. |
| Reports | Calculated monthly comparisons, budget alerts, JOD three-decimal precision, print/save PDF. |

Transfers and bill payments are bookkeeping records; the app does not move money at a bank or pay bills. Recurring transaction flags remain reminders. Goal contributions update goal progress without moving funds between accounts.

## Passwords and data

The default inactivity timeout is five minutes; hidden-app locking is enabled by default. Change these in Preferences. Use the top lock button to lock immediately.

There is no password reset or publisher recovery service. Forgotten passwords cannot decrypt records or backups. Old backups retain their original password after a password change. Without app protection, local records are readable in browser storage. Full backups are encrypted; CSV exports and printed/PDF reports are not.

Data is tied to its browser profile and origin. A different browser, Store webview, domain, device, or profile may have separate data. A different folder on the same origin shares the app's local data key. Back up before moving or clearing site data. Multiple windows detect changes and lock stale sessions to prevent silent overwriting.

## Package contents

Deployable PWA files, icons, bilingual privacy policy, source, tests, security notes, release notes and validation report are included. Original Store artwork is retained under `store-assets`; those original screenshots predate this upgrade. Capture new screenshots in the installed app before Store submission.

This ZIP contains source files, not a signed Windows MSIX installer. The PWA upgrade is ready for your review and hosting update; Windows packaging and certification still require testing in your actual Store environment.

## بالعربية

ارفع ملفات الحزمة داخل مجلد التطبيق الحالي بعد أخذ نسخة احتياطية. ثم افتح **التفضيلات ← كلمة المرور والأمان ← الحماية بكلمة مرور** واختر كلمة مرور من 12 إلى 256 محرفاً. لا توجد كلمة مرور افتراضية ولا خدمة لإعادة تعيينها. احفظ نسخة احتياطية مشفرة وكلمة مرورها جيداً.

التحويلات والفواتير للتسجيل والمتابعة فقط ولا تنفّذ عمليات بنكية. تبقى بياناتك على جهازك، وملفات CSV والتقارير المطبوعة غير مشفرة. هذه حزمة المصدر المحدّثة وليست مُثبّت Windows موقعاً.
