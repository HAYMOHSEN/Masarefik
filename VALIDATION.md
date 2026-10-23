# Verification report — 23 October 2026

The recovered Namaa source was upgraded and verified locally. No production website, GitHub repository or Store submission was changed.

## Results

**22 automated logic/encryption tests passed** (13 finance tests and 9 cryptography/storage tests), plus **23 complete browser checks passed**. JavaScript syntax checks passed. The delivery archive was checked for integrity after packaging.

Environment: Node.js 24; headless Chromium 151 on Linux; desktop 1440×1000 and mobile 390×844 layouts; Arabic RTL and English; Asia/Amman browser timezone. Browser tests use fictitious records and isolated profiles.

## Logic and encryption coverage

- Transfers conserve total balance, update both accounts and do not generate income or spending.
- Thousandth-unit arithmetic preserves JOD precision.
- Weekly schedules, January-31 monthly recurrence, leap-day yearly recurrence, and invalid dates.
- Bill payments generate one expense, advance the schedule and prevent a completed one-time bill being recorded again.
- Invalid amounts, missing account references, duplicate IDs, same-account transfers and unknown future schema versions are refused.
- Legacy duplicate budgets consolidate to the latest category limit.
- CSV quote escaping and spreadsheet formula injection prevention.
- Encryption round trips Unicode and does not expose record markers or passwords in stored output.
- Incorrect passwords, altered ciphertext and invalid encryption metadata are rejected.
- Random salts and IVs differ between new encryptions.
- Plaintext-to-encrypted migration, locked-store access refusal, authenticated password changes and removal.
- Storage conflict detection and preservation of the previous copy when storage is full.

## Browser coverage

1. New workspace is empty.
2. Account, income and expense forms; exact JOD totals.
3. Transfers update both accounts without changing income/spending reports.
4. Bill payment and month-end date advancement.
5. Duplicate entry form, search and category filters.
6. Budget updates and real overspending percentages.
7. Goal contributions without changing account balances.
8. Escaped financial-note content.
9. Simulated quota failure preserves data and leaves the form available.
10. Password mismatch handling and encrypted storage setup.
11. Lock clears displayed records and app state; incorrect passwords fail.
12. Protected reload starts at the lock screen.
13. Password change verifies the old password and invalidates it.
14. Encrypted backup download and restoration preserve the local password.
15. Profile settings, Arabic RTL and dark mode.
16. Mobile layout fits the viewport; menu exposes all pages.
17. Inactivity lock.
18. Hidden-app lock.
19. Authenticated removal of protection retains records.
20. Another window locks when data changes.
21. Old plaintext workspace migrates with IDs and balances intact.
22. Offline protected launch and unlock; CacheStorage contains app assets only.
23. No uncaught browser JavaScript errors.

The lock, bills, preferences and mobile views were visually inspected. Original dashboard issues were also corrected: fixed example percentages were replaced by calculations, the six-month chart avoids month-end overflow, the category donut includes all spending, and over-budget usage is no longer capped at 100% in its text.

## Remaining release work

The signed Windows MSIX/Store package, Microsoft Edge on Windows 10/11, Windows display scaling, Store webview storage continuity, printing on Windows, and Partner Center certification were not run in this environment. The source has not received an independent penetration test or security audit. No universal claim of bug-free or bank-grade security is made.

Runtime limitations are documented in START_HERE.md and SECURITY.md: no password recovery, cloud sync, bank transfers, automatic bill payment or currency conversion. Original Store screenshots are retained as historical artwork and should be replaced before release.
