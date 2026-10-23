/* Secure workspace controller and additional finance tools. No remote services. */
"use strict";
Object.assign(I18N.en, {
  bills: "Bills & subscriptions", transfers: "Transfers", security: "Password & security", enablePassword: "Protect with a password",
  protected: "Password protected", unprotected: "Password protection is off", encryptedDetail: "Your saved financial records are encrypted on this device.",
  enableDetail: "Add a password to encrypt your records and lock your workspace.", lockNow: "Lock now", unlock: "Unlock workspace",
  unlockDetail: "Enter your password to open the records stored on this device.", password: "Password", currentPassword: "Current password",
  newPassword: "New password", confirmPassword: "Confirm password", passwordHint: "Use 12–256 characters. A long, unique passphrase is a good choice.",
  passwordWarning: "Keep your password safe. There is no password reset. A forgotten password cannot unlock these records or their encrypted backups.",
  passwordMismatch: "The two passwords do not match.", passwordLength: "Use a password of 12–256 characters.",
  wrongPassword: "The password is incorrect, or the encrypted file is damaged.", changePassword: "Change password", removePassword: "Remove password protection",
  removeDetail: "After removal, records will be stored without encryption. Enter your current password to continue.", protectionEnabled: "Password protection enabled",
  passwordChanged: "Password changed", protectionRemoved: "Password protection removed", autoLock: "Lock after inactivity", minutes: "minutes",
  lockOnHide: "Lock when the app is hidden", lockOnHideDetail: "Lock when you switch to another tab or minimize the app.",
  saving: "Saving…", saved: "Saved on this device", saveFailed: "Change could not be saved", storageError: "Device storage is full or unavailable. Free up space and try again.",
  storageConflict: "Records changed in another window. Reload to use the latest saved records.", reload: "Reload workspace",
  secureContext: "Password protection requires HTTPS or localhost in a supported browser.", cannotOpen: "Saved data could not be opened. Download a copy before attempting recovery.",
  savedCopy: "Download saved data", tryAgain: "Too many attempts. Try again in 30 seconds.", encryptedBackupDetail: "Encrypted JSON file. The password used when it was created is required to restore it.",
  backupPasswordDetail: "Choose a password for this backup. It does not turn on password protection for the app.", backupPassword: "Backup password",
  restorePasswordDetail: "Enter the password used to create this backup. The current workspace password will stay the same.",
  restoreSafety: "This replaces all current records. Download a backup first if you need to keep them.", plainExportWarning: "CSV exports are readable and are not password protected. Keep the downloaded file in a safe place. Continue?",
  fileTooLarge: "Choose a backup smaller than 16 MB.", save: "Save", profileName: "Your display name", displayNameHint: "Shown only inside this workspace.",
  theme: "Theme", light: "Light", dark: "Dark", accountTransfer: "Transfer between accounts", transferDetail: "Record money moved between your own accounts. Transfers do not count as income or expenses.",
  fromAccount: "From account", toAccount: "To account", addTransfer: "Add transfer", noTransfers: "No transfers yet", transferSaved: "Transfer recorded",
  transferDeleted: "Transfer deleted", needTwoAccounts: "Create at least two accounts before recording a transfer.", differentAccounts: "Choose two different accounts.",
  manageBills: "Plan payments, track subscriptions, and record each payment when you make it.", addBill: "Add bill", billName: "Bill or subscription name", nextDue: "Next due date",
  noBills: "No bills scheduled", noBillsDetail: "Add rent, utilities, insurance, or subscriptions to keep their dates visible.", billSaved: "Bill saved",
  payBill: "Record payment", paymentRecorded: "Payment recorded", confirmPay: "Record this bill as paid today and add its expense to the account?",
  paymentDetail: "This records a payment you made. The app does not pay bills or move money at your bank.",
  active: "Active", completed: "Completed", overdue: "Overdue", dueSoon: "Due within 7 days", billsReserve: "Bills due in the next 30 days",
  afterBills: "Balance after scheduled bills", forecastDetail: "Includes overdue bills and all scheduled occurrences through the next 30 days. Future income and other spending are excluded.",
  duplicate: "Duplicate", fromDate: "From date", toDate: "To date", allCategories: "All categories", clearFilters: "Clear filters", matching: "matching transactions",
  printReport: "Print / save PDF", noPriorMonth: "No prior-month data", surplusMonth: "Income covers this month’s expenses.", deficitMonth: "Spending is above this month’s income.",
  budgetAlert: "Budget needs attention", budgetAlertDetail: "One or more category budgets have reached 80% of their monthly limit.",
  finishSaving: "Saving records. Please wait before closing.", backupTitle: "Backups & export", downloadBackup: "Download encrypted backup",
  downloadBackupDetail: "Download a password-protected copy of all your records.", importBackupDetail: "Accepts encrypted backups and older Namaa JSON backups. Replaces current records after confirmation.",
  noUpcomingDetail: "Add a bill or mark an entry as recurring. Entries are reminders until you record a payment.",
  locked: "Workspace locked", personalExtras: "Make it yours", recordsPrivate: "Your money stays with you", gateFooter: "Local records • Encrypted storage • No cloud account",
  enableBanner: "Add another layer of privacy", enableBannerDetail: "Encrypt this workspace and open it with your own password.",
  currencyConfirm: "This changes the currency label only. It does not convert balances or records. Continue?",
  accountInUse: "This account has transactions, transfers, or scheduled bills. Remove those references first.",
  paidBillEdit: "This payment is linked to a scheduled bill. Deleting it does not change the bill’s next due date.",
  goalClarification: "Goal contributions track progress only; they do not transfer money between accounts.", noDataLoss: "Your saved records are still on this device."
});
Object.assign(I18N.ar, {
  bills: "الفواتير والاشتراكات", transfers: "التحويلات", security: "كلمة المرور والأمان", enablePassword: "الحماية بكلمة مرور",
  protected: "محمي بكلمة مرور", unprotected: "الحماية بكلمة المرور غير مفعلة", encryptedDetail: "سجلاتك المالية المحفوظة مشفرة على هذا الجهاز.",
  enableDetail: "أضف كلمة مرور لتشفير سجلاتك وقفل مساحتك المالية.", lockNow: "قفل الآن", unlock: "فتح المساحة المالية",
  unlockDetail: "أدخل كلمة المرور لفتح السجلات المحفوظة على هذا الجهاز.", password: "كلمة المرور", currentPassword: "كلمة المرور الحالية",
  newPassword: "كلمة المرور الجديدة", confirmPassword: "تأكيد كلمة المرور", passwordHint: "استخدم 12–256 محرفاً. يُفضّل اختيار عبارة مرور طويلة وفريدة.",
  passwordWarning: "احفظ كلمة المرور جيداً. لا تتوفر إعادة تعيين لها. نسيانها يمنع فتح هذه السجلات ونسخها الاحتياطية المشفرة.",
  passwordMismatch: "كلمتا المرور غير متطابقتين.", passwordLength: "استخدم كلمة مرور من 12 إلى 256 محرفاً.",
  wrongPassword: "كلمة المرور غير صحيحة أو الملف المشفر تالف.", changePassword: "تغيير كلمة المرور", removePassword: "إلغاء الحماية بكلمة المرور",
  removeDetail: "بعد الإلغاء ستُحفظ السجلات دون تشفير. أدخل كلمة المرور الحالية للمتابعة.", protectionEnabled: "تم تفعيل الحماية بكلمة المرور",
  passwordChanged: "تم تغيير كلمة المرور", protectionRemoved: "تم إلغاء الحماية بكلمة المرور", autoLock: "القفل بعد عدم الاستخدام", minutes: "دقائق",
  lockOnHide: "القفل عند إخفاء التطبيق", lockOnHideDetail: "قفل المساحة عند الانتقال إلى تبويب آخر أو تصغير التطبيق.",
  saving: "جارٍ الحفظ…", saved: "محفوظ على هذا الجهاز", saveFailed: "تعذّر حفظ التغيير", storageError: "مساحة التخزين ممتلئة أو غير متاحة. وفّر مساحة ثم أعد المحاولة.",
  storageConflict: "تغيّرت السجلات في نافذة أخرى. أعد التحميل لاستخدام أحدث نسخة محفوظة.", reload: "إعادة تحميل المساحة",
  secureContext: "الحماية بكلمة المرور تتطلب HTTPS أو localhost ومتصفحاً مدعوماً.", cannotOpen: "تعذّر فتح البيانات المحفوظة. نزّل نسخة منها قبل محاولة الاستعادة.",
  savedCopy: "تنزيل البيانات المحفوظة", tryAgain: "محاولات كثيرة. أعد المحاولة بعد 30 ثانية.", encryptedBackupDetail: "ملف JSON مشفر. تحتاج إلى كلمة المرور المستخدمة عند إنشائه لاستعادته.",
  backupPasswordDetail: "اختر كلمة مرور لهذه النسخة. هذا لا يُفعّل حماية التطبيق بكلمة مرور.", backupPassword: "كلمة مرور النسخة الاحتياطية",
  restorePasswordDetail: "أدخل كلمة المرور المستخدمة عند إنشاء النسخة. ستبقى كلمة مرور المساحة الحالية كما هي.",
  restoreSafety: "سيستبدل هذا جميع السجلات الحالية. نزّل نسخة احتياطية أولاً إن أردت الاحتفاظ بها.", plainExportWarning: "ملفات CSV قابلة للقراءة وغير محمية بكلمة مرور. احتفظ بالملف في مكان آمن. هل تريد المتابعة؟",
  fileTooLarge: "اختر نسخة احتياطية أصغر من 16 ميجابايت.", save: "حفظ", profileName: "اسم العرض", displayNameHint: "يظهر داخل هذه المساحة فقط.",
  theme: "المظهر", light: "فاتح", dark: "داكن", accountTransfer: "تحويل بين الحسابات", transferDetail: "سجّل المبالغ المنقولة بين حساباتك. لا تُحسب التحويلات دخلاً أو مصروفاً.",
  fromAccount: "من حساب", toAccount: "إلى حساب", addTransfer: "إضافة تحويل", noTransfers: "لا توجد تحويلات بعد", transferSaved: "تم تسجيل التحويل",
  transferDeleted: "تم حذف التحويل", needTwoAccounts: "أنشئ حسابين على الأقل قبل تسجيل تحويل.", differentAccounts: "اختر حسابين مختلفين.",
  manageBills: "خطّط للمدفوعات وتابع الاشتراكات وسجّل الدفعات عند سدادها.", addBill: "إضافة فاتورة", billName: "اسم الفاتورة أو الاشتراك", nextDue: "الاستحقاق القادم",
  noBills: "لا توجد فواتير مجدولة", noBillsDetail: "أضف الإيجار أو الخدمات أو التأمين أو الاشتراكات لتتابع مواعيدها.", billSaved: "تم حفظ الفاتورة",
  payBill: "تسجيل السداد", paymentRecorded: "تم تسجيل السداد", confirmPay: "هل تريد تسجيل سداد هذه الفاتورة اليوم وإضافة مصروفها إلى الحساب؟",
  paymentDetail: "هذا تسجيل لدفعة قمت بها. التطبيق لا يسدد الفواتير ولا يحرك الأموال في البنك.",
  active: "نشطة", completed: "مكتملة", overdue: "متأخرة", dueSoon: "تستحق خلال 7 أيام", billsReserve: "فواتير الثلاثين يوماً القادمة",
  afterBills: "الرصيد بعد الفواتير المجدولة", forecastDetail: "يشمل الفواتير المتأخرة وجميع مرات الاستحقاق خلال 30 يوماً. لا يشمل الدخل أو الإنفاق المستقبلي الآخر.",
  duplicate: "تكرار العملية", fromDate: "من تاريخ", toDate: "إلى تاريخ", allCategories: "جميع الفئات", clearFilters: "مسح الفلاتر", matching: "عمليات مطابقة",
  printReport: "طباعة / حفظ PDF", noPriorMonth: "لا توجد بيانات للشهر السابق", surplusMonth: "الدخل يغطي مصروفات هذا الشهر.", deficitMonth: "الإنفاق يتجاوز دخل هذا الشهر.",
  budgetAlert: "ميزانية تحتاج إلى انتباه", budgetAlertDetail: "وصلت ميزانية فئة أو أكثر إلى 80% من حدها الشهري.",
  finishSaving: "جارٍ حفظ السجلات. انتظر قبل الإغلاق.", backupTitle: "النسخ الاحتياطية والتصدير", downloadBackup: "تنزيل نسخة احتياطية مشفرة",
  downloadBackupDetail: "نزّل نسخة محمية بكلمة مرور من جميع سجلاتك.", importBackupDetail: "يقبل النسخ المشفرة ونسخ نماء JSON القديمة. يستبدل السجلات الحالية بعد التأكيد.",
  noUpcomingDetail: "أضف فاتورة أو فعّل التكرار لعملية. تبقى العمليات تذكيرات إلى أن تسجل سدادها.",
  locked: "المساحة المالية مقفلة", personalExtras: "مساحتك كما تريدها", recordsPrivate: "أموالك تبقى معك", gateFooter: "سجلات محلية • تخزين مشفر • دون حساب سحابي",
  enableBanner: "أضف طبقة أخرى من الخصوصية", enableBannerDetail: "شفّر هذه المساحة وافتحها بكلمة مرور تختارها.",
  currencyConfirm: "هذا يغيّر اسم العملة فقط ولا يحوّل الأرصدة أو السجلات. هل تريد المتابعة؟",
  accountInUse: "يرتبط هذا الحساب بعمليات أو تحويلات أو فواتير. أزل هذه الارتباطات أولاً.",
  paidBillEdit: "ترتبط هذه الدفعة بفاتورة مجدولة. حذفها لا يغيّر موعد الاستحقاق القادم.",
  goalClarification: "إضافات الأهداف لتتبع التقدم فقط؛ لا تحوّل الأموال بين الحسابات.", noDataLoss: "سجلاتك المحفوظة ما زالت على هذا الجهاز."
});

function amountStep() { return state.currency === "JOD" ? "0.001" : "0.01"; }
function setSaveStatus(key) {
  const el = document.getElementById("saveStatus");
  if (el) { el.textContent = t(key); el.dataset.status = key; }
}
function renderSecurityStatus() {
  const el = document.getElementById("lockButton");
  el.dataset.action = vaultStore.secured ? "lock-workspace" : "enable-password";
  el.setAttribute("aria-label", t(vaultStore.secured ? "lockNow" : "enablePassword"));
  el.title = el.getAttribute("aria-label");
  if (document.getElementById("saveStatus").dataset.status !== "saving") setSaveStatus("saved");
}
function renderSecurityBanner() {
  const alerts = state.budgets.some(b => budgetSpend(b.category) >= b.limit * .8)
    ? `<aside class="attention-banner">${icon("bell")}<span><strong>${esc(t("budgetAlert"))}</strong><small>${esc(t("budgetAlertDetail"))}</small></span><button class="quiet-button" type="button" data-page="budgets">${esc(t("seeAll"))}</button></aside>` : "";
  return (vaultStore.secured ? "" : `<aside class="privacy-banner">${icon("shield")}<span><strong>${esc(t("enableBanner"))}</strong><small>${esc(t("enableBannerDetail"))}</small></span><button class="secondary-button" type="button" data-action="enable-password">${esc(t("enablePassword"))}</button></aside>`) + alerts;
}
function monthComparison(type) {
  const now = new Date(), prior = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const records = state.transactions.filter(x => x.date.startsWith(NamaaCore.localDate(prior).slice(0, 7)));
  const before = sumTransactions(records, type), after = type === "income" ? monthIncome() : monthExpense();
  if (!before) return t("noPriorMonth");
  const difference = (after - before) / before * 100;
  return `${difference > 0 ? "+" : ""}${difference.toFixed(1)}% ${t("fromLastMonth")}`;
}
function renderSecuritySettings() {
  return `<section class="page-heading-row"><div><h2>${esc(t("security"))}</h2><p>${esc(t(vaultStore.secured ? "encryptedDetail" : "enableDetail"))}</p></div><span class="security-badge ${vaultStore.secured ? "secured" : ""}">${icon("shield")}${esc(t(vaultStore.secured ? "protected" : "unprotected"))}</span></section>
    <section class="panel security-settings"><div class="security-actions">${vaultStore.secured ? `<button class="primary-button" type="button" data-action="lock-workspace">${icon("lock")}${esc(t("lockNow"))}</button><button class="secondary-button" type="button" data-action="change-password">${esc(t("changePassword"))}</button><button class="quiet-button danger-text" type="button" data-action="remove-password">${esc(t("removePassword"))}</button>` : `<button class="primary-button" type="button" data-action="enable-password">${icon("shield")}${esc(t("enablePassword"))}</button>`}</div>
      ${vaultStore.secured ? `<div class="setting-row"><span class="setting-copy"><strong>${esc(t("autoLock"))}</strong></span><select class="select-control" data-extra-setting="autoLockMinutes" aria-label="${esc(t("autoLock"))}">${[1,2,5,10,15,30].map(n => `<option value="${n}" ${state.preferences.autoLockMinutes === n ? "selected" : ""}>${n} ${esc(t("minutes"))}</option>`).join("")}</select></div><div class="setting-row"><span class="setting-copy"><strong>${esc(t("lockOnHide"))}</strong><small>${esc(t("lockOnHideDetail"))}</small></span><button class="switch ${state.preferences.lockOnHide ? "on" : ""}" type="button" role="switch" aria-checked="${state.preferences.lockOnHide}" aria-label="${esc(t("lockOnHide"))}" data-action="toggle-lock-on-hide"></button></div>` : ""}
      <p class="security-explanation">${esc(t("passwordWarning"))}</p></section>
    <section class="panel personal-settings"><div class="panel-heading"><h3>${esc(t("personalExtras"))}</h3></div><form data-form="profile" class="profile-form"><div class="field"><label for="display-name">${esc(t("profileName"))}</label><input id="display-name" class="input-control" name="name" maxlength="70" value="${esc(state.profile.name)}" autocomplete="off" /></div><button class="secondary-button" type="submit">${esc(t("save"))}</button><div class="field"><label for="theme-select">${esc(t("theme"))}</label><select id="theme-select" class="select-control" data-extra-setting="theme"><option value="light" ${state.preferences.theme === "light" ? "selected" : ""}>${esc(t("light"))}</option><option value="dark" ${state.preferences.theme === "dark" ? "selected" : ""}>${esc(t("dark"))}</option></select></div></form></section>`;
}
const baseSettingsPage = renderSettingsPage;
renderSettingsPage = function () { return renderSecuritySettings() + baseSettingsPage(); };

let gateLanguage = navigator.language?.startsWith("ar") ? "ar" : "en";
let gateReason = "locked", failedUnlocks = 0, retryUnlockAt = 0;
function showGate(reason = "locked") {
  gateReason = reason;
  document.getElementById("appShell").hidden = true;
  const screen = document.getElementById("lockScreen");
  screen.hidden = false;
  document.documentElement.lang = gateLanguage;
  document.documentElement.dir = gateLanguage === "ar" ? "rtl" : "ltr";
  delete document.documentElement.dataset.theme;
  const gt = key => I18N[gateLanguage][key] || I18N.en[key] || key;
  const canUnlock = reason === "locked";
  screen.innerHTML = `<div class="lock-decoration" aria-hidden="true"></div><article class="lock-card"><header class="lock-brand"><img src="icons/icon.svg" alt="" width="52" height="52" /><strong>Namaa<span>Finance</span></strong><button class="language-toggle" type="button" data-gate="language">${gateLanguage === "en" ? "العربية" : "English"}</button></header><div class="lock-emblem">${icon("lock")}</div><p class="lock-kicker">${esc(gt("recordsPrivate"))}</p><h1>${esc(gt(canUnlock ? "locked" : "cannotOpen"))}</h1><p class="lock-description">${esc(gt(canUnlock ? "unlockDetail" : reason === "conflict" ? "storageConflict" : "noDataLoss"))}</p>
    ${canUnlock ? `<form data-form="unlock"><div class="field"><label for="unlock-password">${esc(gt("password"))}</label><input id="unlock-password" class="input-control" name="password" type="password" maxlength="256" required autocomplete="current-password" autofocus /></div><p id="unlockError" class="inline-error" role="alert"></p><button class="primary-button lock-submit" type="submit">${icon("lock")}${esc(gt("unlock"))}</button></form><p class="lock-recovery">${esc(gt("passwordWarning"))}</p>` : `<div class="recovery-actions"><button class="primary-button" type="button" data-gate="reload">${esc(gt("reload"))}</button><button class="secondary-button" type="button" data-gate="download">${esc(gt("savedCopy"))}</button></div>`}
    <footer>${esc(gt("gateFooter"))}</footer></article>`;
  requestAnimationFrame(() => screen.querySelector("input")?.focus());
}
async function bootWorkspace() {
  try {
    state = loadState();
    if (vaultStore.secured) { workspaceLocked = true; showGate(); }
    else {
      workspaceLocked = false;
      renderApp();
      await runTask(maybeShowMonthlyReview);
    }
  } catch { workspaceLocked = true; vaultStore.lock(); showGate("error"); }
}
async function lockWorkspace(reason = "locked") {
  if (workspaceLocked) return lockPromise;
  gateLanguage = state.language;
  workspaceLocked = true;
  closeModal();
  pendingBackup = null;
  transactionSearch = transactionAccount = transactionCategory = transactionFrom = transactionTo = "";
  currentPage = "dashboard";
  document.getElementById("toastRegion").replaceChildren();
  document.getElementById("appContent").replaceChildren();
  document.getElementById("profileName").textContent = "";
  document.getElementById("pageTitle").textContent = "";
  document.getElementById("pageEyebrow").textContent = "";
  document.title = "Namaa Finance";
  state = createDefaultState();
  showGate(reason);
  lockPromise = pendingSave.catch(() => {}).finally(() => vaultStore.lock());
  return lockPromise;
}
function errorMessage(error) {
  const codes = { WRONG_PASSWORD: "wrongPassword", PASSWORD_LENGTH: "passwordLength", PASSWORD_MISMATCH: "passwordMismatch", SECURE_CONTEXT_REQUIRED: "secureContext", STORAGE_CONFLICT: "storageConflict", FILE_TOO_LARGE: "fileTooLarge", INVALID_DATA: "invalidBackup", INVALID_VAULT: "invalidBackup", BILL_ALREADY_PAID: "paymentRecorded" };
  return t(codes[error?.message] || (error?.name === "QuotaExceededError" || error?.name === "SecurityError" ? "storageError" : error?.name === "SyntaxError" ? "invalidBackup" : "saveFailed"));
}
async function runTask(task) {
  if (workspaceLocked || uiBusy) return;
  uiBusy = true;
  const before = structuredClone(state);
  const buttons = [...document.querySelectorAll('button[type="submit"]')];
  buttons.forEach(x => x.disabled = true);
  try { await task(); }
  catch (error) {
    if (error.message === "STORAGE_CONFLICT") await lockWorkspace("conflict");
    else if (!workspaceLocked) {
      state = before;
      setSaveStatus("saveFailed");
      showToast(errorMessage(error), "", "error");
      const form = document.querySelector("#modalLayer form");
      if (form) {
        let el = form.querySelector(".inline-error");
        if (!el) { el = document.createElement("p"); el.className = "inline-error"; el.setAttribute("role", "alert"); form.querySelector(".modal-body")?.append(el); }
        el.textContent = errorMessage(error);
      }
      // Do not erase a failed form; let the user correct it and retry.
    }
  } finally {
    uiBusy = false; buttons.forEach(x => x.disabled = false);
    if (!workspaceLocked && vaultStore.secured && document.hidden && state.preferences.lockOnHide) void lockWorkspace();
  }
}
async function unlockForm(form) {
  if (uiBusy) return;
  const error = document.getElementById("unlockError"), button = form.querySelector("button");
  const gt = key => I18N[gateLanguage][key] || I18N.en[key];
  if (Date.now() < retryUnlockAt) { error.textContent = gt("tryAgain"); return; }
  uiBusy = true; button.disabled = true;
  let password = form.elements.password.value;
  form.elements.password.value = "";
  try {
    await lockPromise;
    const value = await vaultStore.unlock(password);
    state = NamaaCore.normalize(value, createDefaultState());
    failedUnlocks = 0; retryUnlockAt = 0; lastActivity = Date.now();
    workspaceLocked = false;
    renderApp();
    document.getElementById("lockScreen").replaceChildren();
  } catch (e) {
    vaultStore.lock();
    failedUnlocks++;
    if (failedUnlocks >= 5) { retryUnlockAt = Date.now() + 30000; failedUnlocks = 0; }
    error.textContent = gt(e.message === "STORAGE_CONFLICT" ? "storageConflict" : "wrongPassword");
  } finally { password = ""; uiBusy = false; button.disabled = false; }
}
function passwordField(name, label, isNew = false) {
  return `<div class="field"><label for="password-${name}">${esc(label)}</label><input id="password-${name}" class="input-control" type="password" name="${name}" maxlength="256" ${isNew ? 'minlength="12"' : ''} required autocomplete="${isNew ? "new-password" : "current-password"}" /></div>`;
}
function openPasswordModal(mode) {
  const title = { enable: "enablePassword", change: "changePassword", remove: "removePassword", backup: "backupPassword", restore: "importBackup" }[mode];
  const detail = { enable: "enableDetail", change: "passwordHint", remove: "removeDetail", backup: "backupPasswordDetail", restore: "restorePasswordDetail" }[mode];
  const old = ["change", "remove", "restore"].includes(mode) ? passwordField("current", t(mode === "restore" ? "backupPassword" : "currentPassword")) : "";
  const next = ["enable", "change", "backup"].includes(mode) ? passwordField("next", t(mode === "backup" ? "backupPassword" : "newPassword"), true) + passwordField("confirmation", t("confirmPassword"), true) : "";
  openModal(`${modalHeader(t(title), t(detail))}<form data-form="password" data-mode="${mode}"><div class="modal-body"><div class="form-grid one">${old}${next}</div><p class="security-explanation">${esc(t(["remove", "restore"].includes(mode) ? (mode === "restore" ? "restoreSafety" : "removeDetail") : "passwordWarning"))}</p><p class="inline-error" role="alert"></p></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${esc(t(mode === "restore" ? "restoreBackup" : "save"))}</button></footer></form>`, "small");
}
async function submitPassword(form) {
  const mode = form.dataset.mode;
  let next = form.elements.next?.value || "", current = form.elements.current?.value || "";
  try {
    if (["enable", "change", "backup"].includes(mode)) {
      NamaaCrypto.checkPassword(next);
      if (next !== form.elements.confirmation.value) throw new Error("PASSWORD_MISMATCH");
    }
    if (mode === "enable") await vaultStore.protect(NamaaCore.normalize(state, createDefaultState()), next);
    if (mode === "change") await vaultStore.changePassword(state, current, next);
    if (mode === "remove") await vaultStore.removePassword(state, current);
    if (mode === "backup") {
      const encrypted = await NamaaCrypto.seal(state, next);
      downloadFile(`namaa-encrypted-backup-${isoDate()}.json`, JSON.stringify(encrypted), "application/json");
    }
    if (mode === "restore") {
      const backup = pendingBackup;
      if (!backup) throw new Error("INVALID_VAULT");
      const value = await NamaaCrypto.open(backup, current);
      await applyImportedState(value?.data || value);
      return;
    }
    form.reset(); closeModal(); renderApp(); lastActivity = Date.now();
    showToast(t({ enable: "protectionEnabled", change: "passwordChanged", remove: "protectionRemoved", backup: "backupDownloaded" }[mode]));
  } finally { next = ""; current = ""; }
}
async function applyImportedState(value) {
  if (!Array.isArray(value?.accounts) || !Array.isArray(value?.transactions)) throw new Error("INVALID_DATA");
  const imported = NamaaCore.normalize(value, createDefaultState());
  if (!window.confirm(t("confirmRestore") + "\n\n" + t("restoreSafety"))) return;
  // The local password and encryption mode belong to Store, never to imported JSON.
  state = imported;
  await saveState();
  pendingBackup = null; currentPage = "dashboard"; closeModal(); renderApp();
  showToast(t("backupRestored"));
}

function renderTransactionFilters(count) {
  return `<section class="transaction-filters panel"><div class="field"><label for="filter-account">${esc(t("account"))}</label><select id="filter-account" class="select-control" data-filter-field="account"><option value="">${esc(t("allAccounts"))}</option>${accountOptions(transactionAccount)}</select></div><div class="field"><label for="filter-category">${esc(t("category"))}</label><select id="filter-category" class="select-control" data-filter-field="category"><option value="">${esc(t("allCategories"))}</option>${Object.entries(CATEGORY_META).map(([id]) => `<option value="${id}" ${transactionCategory === id ? "selected" : ""}>${esc(categoryLabel(id))}</option>`).join("")}</select></div><div class="field"><label for="filter-from">${esc(t("fromDate"))}</label><input class="input-control" id="filter-from" type="date" data-filter-field="from" value="${esc(transactionFrom)}" /></div><div class="field"><label for="filter-to">${esc(t("toDate"))}</label><input class="input-control" id="filter-to" type="date" data-filter-field="to" value="${esc(transactionTo)}" /></div><button class="quiet-button" type="button" data-action="clear-filters">${esc(t("clearFilters"))}</button><small class="filter-count">${count} ${esc(t("matching"))}</small></section>`;
}
function formFooter(label = "save") {
  return `<footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}${esc(t(label))}</button></footer>`;
}
function amountField(label = "amount") {
  return `<div class="field"><label for="extra-amount">${esc(t(label))}</label><input id="extra-amount" class="input-control" name="amount" required type="number" min="${amountStep()}" max="999999999" step="${amountStep()}" inputmode="decimal" placeholder="0.00" /></div>`;
}
function renderTransfersPage() {
  return `<section class="page-heading-row"><div><h2>${esc(t("transfers"))}</h2><p>${esc(t("transferDetail"))}</p></div><button class="primary-button" type="button" data-action="add-transfer">${icon("repeat")}${esc(t("addTransfer"))}</button></section>
    ${state.transfers.length ? `<section class="data-table-wrap"><table class="data-table"><thead><tr><th>${esc(t("date"))}</th><th>${esc(t("fromAccount"))}</th><th>${esc(t("toAccount"))}</th><th>${esc(t("note"))}</th><th>${esc(t("amount"))}</th><th>${esc(t("actions"))}</th></tr></thead><tbody>${[...state.transfers].sort((a,b) => b.date.localeCompare(a.date)).map(x => `<tr><td>${esc(dateLabel(x.date))}</td><td>${esc(accountLabel(state.accounts.find(a => a.id === x.fromAccountId)))}</td><td>${esc(accountLabel(state.accounts.find(a => a.id === x.toAccountId)))}</td><td>${esc(x.note)}</td><td class="table-amount ${visibilityClass()}">${money(x.amount)}</td><td><button class="row-action delete" type="button" data-action="delete-transfer" data-id="${esc(x.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></td></tr>`).join("")}</tbody></table></section>` : `<section class="panel">${renderFullEmpty(t("noTransfers"), t("transferDetail"), "repeat", "add-transfer", t("addTransfer"))}</section>`}`;
}
function openTransferModal() {
  if (state.accounts.length < 2) return showToast(t("needTwoAccounts"), "", "error");
  openModal(`${modalHeader(t("accountTransfer"), t("transferDetail"))}<form data-form="transfer"><div class="modal-body"><div class="form-grid"><div class="field"><label for="transfer-from">${esc(t("fromAccount"))}</label><select id="transfer-from" class="select-control" name="fromAccountId">${accountOptions(state.accounts[0].id)}</select></div><div class="field"><label for="transfer-to">${esc(t("toAccount"))}</label><select id="transfer-to" class="select-control" name="toAccountId">${accountOptions(state.accounts[1].id)}</select></div>${amountField()}<div class="field"><label for="transfer-date">${esc(t("date"))}</label><input id="transfer-date" class="input-control" name="date" type="date" value="${isoDate()}" required /></div><div class="field full"><label for="transfer-note">${esc(t("note"))}</label><input id="transfer-note" class="input-control" name="note" maxlength="300" /></div></div></div>${formFooter()}</form>`);
}
async function submitTransfer(form) {
  const f = new FormData(form);
  if (f.get("fromAccountId") === f.get("toAccountId")) return showToast(t("differentAccounts"), "", "error");
  state.transfers.push({ id: uid("transfer"), fromAccountId: String(f.get("fromAccountId")), toAccountId: String(f.get("toAccountId")), date: String(f.get("date")), amount: Number(f.get("amount")), note: String(f.get("note") || "").trim() });
  await saveState(); closeModal(); renderApp(); showToast(t("transferSaved"));
}
function billReserve() {
  const end = NamaaCore.addDays(isoDate(), 30), values = [];
  for (const bill of state.bills.filter(x => x.active !== false)) {
    let due = bill.nextDue;
    // Includes every unpaid occurrence, including arrears, without silently marking it paid.
    for (let i = 0; due <= end && i < 530000; i++) {
      values.push(bill.amount);
      if (bill.frequency === "once") break;
      due = NamaaCore.nextOccurrence(due, bill.frequency, bill.anchorDate || bill.nextDue);
    }
  }
  return NamaaCore.sum(values);
}
function renderBillsPage() {
  const reserve = billReserve(), today = isoDate(), week = NamaaCore.addDays(today, 7);
  const bills = [...state.bills].sort((a,b) => Number(a.active === false) - Number(b.active === false) || a.nextDue.localeCompare(b.nextDue));
  return `<section class="page-heading-row"><div><h2>${esc(t("bills"))}</h2><p>${esc(t("manageBills"))}</p></div><button class="primary-button" type="button" data-action="add-bill">${icon("plus")}${esc(t("addBill"))}</button></section>
    <section class="bill-summary"><article class="panel"><p class="card-kicker">${esc(t("billsReserve"))}</p><strong class="metric-amount ${visibilityClass()}">${money(reserve)}</strong></article><article class="panel"><p class="card-kicker">${esc(t("afterBills"))}</p><strong class="metric-amount ${visibilityClass()}">${money(NamaaCore.sum([totalBalance(), -reserve]))}</strong></article></section><p class="forecast-note">${esc(t("forecastDetail"))}</p>
    ${bills.length ? `<section class="bills-grid">${bills.map(b => {
      const active = b.active !== false, overdue = active && b.nextDue < today;
      const status = !active ? "completed" : overdue ? "overdue" : b.nextDue <= week ? "dueSoon" : "active";
      return `<article class="panel bill-card"><div class="bill-top"><span class="bill-category">${icon(CATEGORY_META[b.category]?.icon || "calendar")}</span><span class="pill ${overdue ? "expense" : ""}">${esc(t(status))}</span><button class="row-action delete" type="button" data-action="delete-bill" data-id="${esc(b.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></div><h3>${esc(b.name)}</h3><p class="bill-amount ${visibilityClass()}">${money(b.amount)}</p><p class="subtext">${esc(t(b.frequency))} · ${esc(accountLabel(state.accounts.find(a => a.id === b.accountId)))}</p><p class="bill-due">${icon("calendar")}${esc(dateLabel(b.nextDue, { day:"numeric", month:"short", year:"numeric" }))}</p>${active ? `<button class="secondary-button" type="button" data-action="pay-bill" data-id="${esc(b.id)}">${icon("check")}${esc(t("payBill"))}</button>` : `<span class="positive">${esc(t("completed"))}</span>`}</article>`;
    }).join("")}</section>` : `<section class="panel">${renderFullEmpty(t("noBills"), t("noBillsDetail"), "calendar", "add-bill", t("addBill"))}</section>`}<p class="forecast-note">${esc(t("paymentDetail"))}</p>`;
}
function openBillModal() {
  if (!state.accounts.length) return showToast(t("noAccounts"), t("noAccountsDetail"), "error");
  openModal(`${modalHeader(t("addBill"), t("manageBills"))}<form data-form="bill"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="bill-name">${esc(t("billName"))}</label><input id="bill-name" class="input-control" name="name" maxlength="80" required autofocus /></div>${amountField()}<div class="field"><label for="bill-due">${esc(t("nextDue"))}</label><input id="bill-due" class="input-control" name="nextDue" type="date" value="${isoDate()}" required /></div><div class="field"><label for="bill-account">${esc(t("account"))}</label><select id="bill-account" class="select-control" name="accountId">${accountOptions(state.accounts[0].id)}</select></div><div class="field"><label for="bill-category">${esc(t("category"))}</label><select id="bill-category" class="select-control" name="category">${categoryOptions("expense", "utilities")}</select></div><div class="field full"><label for="bill-frequency">${esc(t("frequency"))}</label><select id="bill-frequency" class="select-control" name="frequency">${["monthly", "weekly", "yearly", "once"].map(x => `<option value="${x}">${esc(t(x))}</option>`).join("")}</select></div></div><p class="field-help">${esc(t("paymentDetail"))}</p></div>${formFooter()}</form>`);
}
async function submitBill(form) {
  const f = new FormData(form), due = String(f.get("nextDue"));
  state.bills.push({ id: uid("bill"), name: String(f.get("name")).trim(), amount: Number(f.get("amount")), nextDue: due, anchorDate: due, frequency: String(f.get("frequency")), accountId: String(f.get("accountId")), category: String(f.get("category")), active: true });
  await saveState(); closeModal(); renderApp(); showToast(t("billSaved"));
}
const baseReportsPage = renderReportsPage;
renderReportsPage = function () { return `<div class="print-tools"><button class="secondary-button" type="button" data-action="print-report">${icon("file")}${esc(t("printReport"))}</button></div>` + baseReportsPage(); };

async function handleAction(action, id, button) {
  switch (action) {
    case "close-modal": closeModal(); pendingBackup = null; break;
    case "lock-workspace": if (vaultStore.secured) await lockWorkspace(); break;
    case "enable-password": openPasswordModal("enable"); break;
    case "change-password": openPasswordModal("change"); break;
    case "remove-password": openPasswordModal("remove"); break;
    case "add-transfer": openTransferModal(); break;
    case "add-bill": openBillModal(); break;
    case "delete-transfer":
      if (!confirm(t("confirmDelete"))) break;
      state.transfers = state.transfers.filter(x => x.id !== id); await saveState(); renderApp(); showToast(t("transferDeleted")); break;
    case "delete-bill":
      if (!confirm(t("confirmDelete"))) break;
      state.bills = state.bills.filter(x => x.id !== id); await saveState(); renderApp(); break;
    case "pay-bill":
      if (!confirm(t("confirmPay") + "\n" + t("paymentDetail"))) break;
      NamaaCore.payBill(state, id, uid("payment"), isoDate()); await saveState(); renderApp(); showToast(t("paymentRecorded")); break;
    case "duplicate-transaction": {
      const tx = state.transactions.find(x => x.id === id);
      if (tx) openTransactionModal(tx.type, { ...tx, id: "", date: isoDate(), recurring: false });
      break;
    }
    case "clear-filters": transactionSearch = transactionAccount = transactionCategory = transactionFrom = transactionTo = ""; transactionFilter = "all"; renderContent(); renderIcons(); break;
    case "print-report": window.print(); break;
    case "toggle-lock-on-hide": state.preferences.lockOnHide = !state.preferences.lockOnHide; await saveState(); renderApp(); break;
    case "add-transaction": openTransactionModal(); break;
    case "quick-expense": openTransactionModal("expense"); break;
    case "quick-income": openTransactionModal("income"); break;
    case "edit-transaction": openTransactionModal("expense", state.transactions.find(x => x.id === id)); break;
    case "delete-transaction": await deleteTransaction(id); break;
    case "transaction-filter": transactionFilter = button.dataset.filter || "all"; renderContent(); renderIcons(); break;
    case "select-transaction-type": setTransactionType(button.dataset.type); break;
    case "add-budget": openBudgetModal(); break;
    case "delete-budget": await deleteBudget(id); break;
    case "add-goal": openGoalModal(); break;
    case "contribute-goal": openGoalContributionModal(state.goals.find(x => x.id === id)); break;
    case "delete-goal": await deleteGoal(id); break;
    case "add-account": openAccountModal(); break;
    case "delete-account": await deleteAccount(id); break;
    case "add-record": openRecordModal(); break;
    case "delete-record": await deleteRecord(id); break;
    case "open-backup": openBackupModal(); break;
    case "export-json": await exportJson(); break;
    case "export-csv": exportCsv(); break;
    case "trigger-import": document.getElementById("backupImport")?.click(); break;
    case "toggle-privacy": state.privacyMode = !state.privacyMode; await saveState(); renderApp(); break;
    case "toggle-reminder": state.preferences.monthlyReminder = !state.preferences.monthlyReminder; await saveState(); renderApp(); break;
  }
}
document.addEventListener("click", async event => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const gate = target.closest("[data-gate]");
  if (gate) {
    if (gate.dataset.gate === "language" && !uiBusy) { gateLanguage = gateLanguage === "en" ? "ar" : "en"; showGate(gateReason); }
    if (gate.dataset.gate === "reload") location.reload();
    if (gate.dataset.gate === "download") downloadFile("namaa-saved-data-recovery.json", localStorage.getItem(STORAGE_KEY) || "null", "application/json");
    return;
  }
  if (workspaceLocked || uiBusy) return;
  const page = target.closest("[data-page]");
  if (page) { navigate(page.dataset.page); return; }
  const action = target.closest("[data-action]");
  if (action) { await runTask(() => handleAction(action.dataset.action, action.dataset.id, action)); return; }
  const id = target.closest("button")?.id;
  if (id === "languageToggle") await runTask(async () => { state.language = state.language === "ar" ? "en" : "ar"; await saveState(); renderApp(); });
  if (id === "privacyToggle") await runTask(() => handleAction("toggle-privacy"));
  if (id === "mobileMenu") openMobileNavigation();
  if (id === "profileMenu") navigate("settings");
  if (id === "openBackup") openBackupModal();
});
document.addEventListener("submit", async event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.dataset.form) return;
  event.preventDefault();
  if (form.dataset.form === "unlock") { await unlockForm(form); return; }
  await runTask(async () => {
    const handlers = { transaction: submitTransaction, budget: submitBudget, goal: submitGoal, contribution: submitContribution, account: submitAccount, record: submitRecord, password: submitPassword, transfer: submitTransfer, bill: submitBill };
    if (form.dataset.form === "profile") { state.profile.name = form.elements.name.value.trim(); await saveState(); renderApp(); showToast(t("saved")); }
    else await handlers[form.dataset.form]?.(form);
  });
});
document.addEventListener("input", event => {
  if (workspaceLocked || uiBusy) return;
  const field = event.target;
  if (!(field instanceof HTMLInputElement) || field.id !== "transactionSearch") return;
  transactionSearch = field.value;
  const cursor = field.selectionStart;
  renderContent(); renderIcons();
  const replacement = document.getElementById("transactionSearch");
  replacement?.focus(); replacement?.setSelectionRange(cursor, cursor);
});
document.addEventListener("change", async event => {
  if (workspaceLocked || uiBusy) return;
  const field = event.target;
  if (!(field instanceof HTMLElement)) return;
  if (field.dataset.filterField) {
    const f = field.dataset.filterField;
    if (f === "account") transactionAccount = field.value;
    if (f === "category") transactionCategory = field.value;
    if (f === "from") transactionFrom = field.value;
    if (f === "to") transactionTo = field.value;
    renderContent(); renderIcons(); return;
  }
  await runTask(async () => {
    if (field.dataset.extraSetting === "autoLockMinutes") state.preferences.autoLockMinutes = Number(field.value);
    if (field.dataset.extraSetting === "theme") state.preferences.theme = field.value;
    if (field.dataset.setting === "language") state.language = field.value === "ar" ? "ar" : "en";
    if (field.dataset.setting === "currency") {
      if (!confirm(t("currencyConfirm"))) { field.value = state.currency; return; }
      state.currency = field.value;
    }
    if (field.dataset.extraSetting || field.dataset.setting) { await saveState(); renderApp(); }
    if (field.id === "backupImport" && field.files?.[0]) await restoreFromFile(field.files[0]);
  });
});
document.addEventListener("keydown", event => {
  if (workspaceLocked || uiBusy) return;
  const modal = document.querySelector(".modal-layer.open .modal");
  if (event.key === "Escape" && modal) { closeModal(); pendingBackup = null; return; }
  if (event.key === "Tab" && modal) {
    const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([type="hidden"]), select, textarea, a[href]')].filter(x => x.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  const typing = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement;
  if (!typing && !modal && event.key.toLowerCase() === "n" && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); openTransactionModal(); }
});
for (const name of ["pointerdown", "keydown", "touchstart", "wheel"]) document.addEventListener(name, () => { lastActivity = Date.now(); }, { passive: true });
document.addEventListener("visibilitychange", () => {
  if (workspaceLocked || !vaultStore.secured) return;
  if ((document.hidden && state.preferences.lockOnHide) || Date.now() - lastActivity >= state.preferences.autoLockMinutes * 60000) void lockWorkspace();
});
window.addEventListener("pagehide", () => { if (!workspaceLocked && vaultStore.secured) void lockWorkspace(); });
window.addEventListener("pageshow", event => { if (event.persisted && vaultStore.secured && !workspaceLocked) void lockWorkspace(); });
window.addEventListener("storage", event => {
  if ((event.key === STORAGE_KEY || event.key === null) && !workspaceLocked && localStorage.getItem(STORAGE_KEY) !== vaultStore.currentRaw) void lockWorkspace("conflict");
});
window.addEventListener("beforeunload", event => {
  if (uiBusy) { event.preventDefault(); event.returnValue = ""; }
});
setInterval(() => {
  if (!workspaceLocked && vaultStore.secured && Date.now() - lastActivity >= state.preferences.autoLockMinutes * 60000) void lockWorkspace();
}, 1000);
registerServiceWorker();
void bootWorkspace();
