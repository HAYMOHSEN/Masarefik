# Microsoft Store update handoff

This delivery contains the PWA source and updated bilingual release copy. It is not a signed Windows package and has not been published. Keep your existing product name, Package ID, Publisher ID, publisher display name, domain and manifest identity when updating an existing listing. Do not reserve a replacement product merely to apply this update.

## Update sequence

1. Export a backup from the currently installed app before deployment. If your live source is newer than the recovered 24 September package, merge its changes first.
2. Host these source files at the current HTTPS app URL. Keep the privacy page publicly accessible at the existing privacy URL. Reload and confirm that the new lock controls, bills and transfers pages appear.
3. Test existing-data migration, password setup, closing/reopening, offline launch, encrypted backup/restore, display scaling, keyboard use, and Arabic/English in the actual installed Windows app.
4. If your Store submission requires an updated Windows package, generate it from the live HTTPS URL with PWABuilder using the existing Partner Center product identity and an increased package version. Complete the package's Windows validation before uploading it to the existing product's update submission.
5. Update the listing text and privacy disclosures to match this build. Original screenshots under `store-assets` are historical artwork; replace those screenshots with captures of the finished Windows app before submission. No new screenshots are presented as Store-ready in this source package.
6. Submit from your Partner Center account after completing your normal certification and signing requirements.

Microsoft's current reference: https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/how-to/microsoft-store (consulted 23 October 2026).

## What's new — English

Optional password protection now encrypts your saved financial records. Lock the app manually, after inactivity, or when hidden. Export encrypted backups and restore older Namaa backups. Record transfers between accounts without inflating income or expenses, track bills and subscriptions, filter transactions, duplicate entries, and print reports. Personalize your display name and theme. This update also corrects monthly comparisons, recurring dates and three-decimal JOD calculations.

## الجديد في هذه النسخة — العربية

حماية اختيارية بكلمة مرور مع تشفير السجلات المالية المحفوظة، وقفل يدوي وتلقائي بعد عدم الاستخدام أو عند إخفاء التطبيق. نسخ احتياطية مشفرة مع دعم استعادة نسخ نماء القديمة. تسجيل التحويلات بين الحسابات دون إضافتها إلى الدخل والمصروفات، ومتابعة الفواتير والاشتراكات، وفلترة العمليات وتكرارها وطباعة التقارير. تخصيص اسم العرض والمظهر. تصحيح المقارنات الشهرية ومواعيد التكرار وحسابات الدينار الأردني بثلاث خانات عشرية.

## Features — English

- Optional encrypted local workspace with password and automatic locking.
- Encrypted full backups; legacy JSON restore; CSV export.
- Income, spending, accounts, budgets, goals and private financial notes.
- Account transfers, bill and subscription schedules, payment recording.
- Search and filters by type, account, category and date.
- Arabic/English, RTL, light/dark theme and printable reports.
- Offline use after the app has loaded successfully.

## المزايا — العربية

- مساحة محلية مشفرة اختيارياً بكلمة مرور وقفل تلقائي.
- نسخ احتياطية كاملة مشفرة واستعادة JSON القديم وتصدير CSV.
- الدخل والمصروفات والحسابات والميزانيات والأهداف والملاحظات المالية.
- التحويلات بين الحسابات وجدولة الفواتير والاشتراكات وتسجيل السداد.
- البحث والتصفية حسب النوع والحساب والفئة والتاريخ.
- العربية والإنجليزية ودعم RTL والمظهر الفاتح والداكن وطباعة التقارير.
- العمل دون اتصال بعد تحميل التطبيق بنجاح.

## Accurate descriptions

Protection is optional. There is no password reset, bank integration, automatic bill payment, cloud synchronization or currency conversion. CSV and printed/PDF reports are not encrypted. Goal contributions only track progress. Do not claim bank-grade security, an independent audit, guaranteed recovery, native Windows Hello, or Store certification for this delivery.
