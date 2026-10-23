(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NamaaCore = api;
})(globalThis, function () {
  "use strict";
  const MAX = 999999999;
  const categories = {
    income: ["salary", "freelance", "investments", "otherIncome"],
    expense: ["food", "housing", "utilities", "transport", "health", "education", "shopping", "entertainment", "otherExpense"]
  };
  function invalid() { throw new Error("INVALID_DATA"); }
  function text(value, max = 500, required = true) {
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) invalid();
    return value;
  }
  function amount(value, minimum = 0) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || Math.abs(value) > MAX || Math.abs(value * 1000 - Math.round(value * 1000)) > 0.001) invalid();
    return value;
  }
  function date(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) invalid();
    const parsed = new Date(value + "T12:00:00Z");
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value || value < "1900-01-01" || value > "9999-12-31") invalid();
    return value;
  }
  function sum(values) { return values.reduce((total, x) => total + Math.round(Number(x) * 1000), 0) / 1000; }
  function localDate(value = new Date()) { return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`; }
  function addDays(value, days) {
    date(value);
    const d = new Date(value + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function nextOccurrence(value, frequency, anchor = value) {
    date(value); date(anchor);
    if (frequency === "weekly") return addDays(value, 7);
    if (!["monthly", "yearly"].includes(frequency)) invalid();
    let [year, month] = value.split("-").map(Number);
    const [, anchorMonth, anchorDay] = anchor.split("-").map(Number);
    if (frequency === "monthly") { month++; if (month === 13) { month = 1; year++; } }
    else { year++; month = anchorMonth; }
    const day = Math.min(anchorDay, new Date(Date.UTC(year, month, 0)).getUTCDate());
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  function upcoming(tx, today) {
    date(today); date(tx.date);
    let result = tx.date;
    for (let i = 0; result < today && i < 530000; i++) result = nextOccurrence(result, tx.frequency || "monthly", tx.date);
    return result;
  }
  function normalize(input, defaults) {
    if (!input || typeof input !== "object" || Array.isArray(input)) invalid();
    if (input.version !== undefined && ![1, 2, 3].includes(input.version)) invalid();
    const result = structuredClone(defaults);
    result.version = 3;
    result.language = input.language === "ar" ? "ar" : "en";
    if (input.currency !== undefined && !["JOD", "USD", "EUR", "GBP", "AED", "SAR"].includes(input.currency)) invalid();
    result.currency = input.currency || "JOD";
    result.privacyMode = Boolean(input.privacyMode);
    result.profile = { name: text(input.profile?.name ?? "", 70, false) };
    const prefs = input.preferences || {};
    result.preferences = {
      monthlyReminder: prefs.monthlyReminder !== false,
      lastReviewPrompt: typeof prefs.lastReviewPrompt === "string" && /^\d{4}-\d{2}$/.test(prefs.lastReviewPrompt) ? prefs.lastReviewPrompt : "",
      autoLockMinutes: [1, 2, 5, 10, 15, 30].includes(prefs.autoLockMinutes) ? prefs.autoLockMinutes : 5,
      lockOnHide: prefs.lockOnHide !== false,
      theme: ["light", "dark"].includes(prefs.theme) ? prefs.theme : "light"
    };
    const ids = new Map();
    for (const field of ["accounts", "transactions", "budgets", "goals", "vaultNotes", "transfers", "bills"]) {
      const list = input[field] ?? [];
      if (!Array.isArray(list) || list.length > 100000) invalid();
      const seen = new Set();
      for (const item of list) {
        if (!item || typeof item !== "object" || Array.isArray(item)) invalid();
        text(item.id, 160);
        if (seen.has(item.id)) invalid();
        seen.add(item.id);
      }
      ids.set(field, seen);
      result[field] = structuredClone(list);
    }
    for (const x of result.accounts) {
      text(x.name, 70); amount(x.openingBalance, -MAX);
      if (!["cash", "bank", "card", "savings"].includes(x.type)) invalid();
    }
    for (const x of result.transactions) {
      text(x.description, 80); amount(x.amount, 0.001); date(x.date); text(x.note ?? "", 300, false);
      if (!categories[x.type]?.includes(x.category) || !ids.get("accounts").has(x.accountId)) invalid();
      if (x.frequency && !["weekly", "monthly", "yearly"].includes(x.frequency)) invalid();
      if (x.recurring !== undefined && typeof x.recurring !== "boolean") invalid();
      if (x.billId !== undefined) { text(x.billId, 160); date(x.billDue); }
    }
    const budgetCategories = new Set();
    // Older versions allowed duplicate category budgets. Keep the last limit.
    result.budgets = result.budgets.reverse().filter(x => {
      amount(x.limit, 0.001);
      if (!categories.expense.includes(x.category)) invalid();
      if (budgetCategories.has(x.category)) return false;
      budgetCategories.add(x.category); return true;
    }).reverse();
    for (const x of result.goals) { text(x.name, 70); amount(x.target, 0.001); amount(x.saved); date(x.dueDate); }
    for (const x of result.vaultNotes) {
      text(x.title, 90); text(x.value, 110); text(x.notes ?? "", 500, false); date(x.updatedAt);
      if (!["insurance", "loan", "tax", "contract", "document", "other"].includes(x.type)) invalid();
    }
    for (const x of result.transfers) {
      amount(x.amount, 0.001); date(x.date); text(x.note ?? "", 300, false);
      if (!ids.get("accounts").has(x.fromAccountId) || !ids.get("accounts").has(x.toAccountId) || x.fromAccountId === x.toAccountId) invalid();
    }
    for (const x of result.bills) {
      text(x.name, 80); amount(x.amount, 0.001); date(x.nextDue); date(x.anchorDate || x.nextDue);
      if (!ids.get("accounts").has(x.accountId) || !categories.expense.includes(x.category) || !["weekly", "monthly", "yearly", "once"].includes(x.frequency)) invalid();
      if (x.active !== undefined && typeof x.active !== "boolean") invalid();
    }
    return result;
  }
  function balance(state, accountId) {
    const account = state.accounts.find(x => x.id === accountId);
    const values = [account?.openingBalance || 0];
    for (const tx of state.transactions) if (tx.accountId === accountId) values.push(tx.type === "income" ? tx.amount : -tx.amount);
    for (const x of state.transfers || []) {
      if (x.fromAccountId === accountId) values.push(-x.amount);
      if (x.toAccountId === accountId) values.push(x.amount);
    }
    return sum(values);
  }
  function payBill(state, id, txId, paymentDate) {
    date(paymentDate);
    const bill = state.bills.find(x => x.id === id);
    if (!bill || bill.active === false) invalid();
    if (state.transactions.some(x => x.billId === id && x.billDue === bill.nextDue)) throw new Error("BILL_ALREADY_PAID");
    const tx = { id: txId, description: bill.name, amount: bill.amount, type: "expense", category: bill.category, accountId: bill.accountId, date: paymentDate, note: "", recurring: false, frequency: "monthly", billId: id, billDue: bill.nextDue };
    state.transactions.push(tx);
    if (bill.frequency === "once") bill.active = false;
    else bill.nextDue = nextOccurrence(bill.nextDue, bill.frequency, bill.anchorDate || bill.nextDue);
    return tx;
  }
  function csvCell(value) {
    let v = String(value ?? "");
    if (/^[\s\uFEFF]*[=+\-@\t\r\n]/.test(v)) v = "'" + v;
    return '"' + v.replaceAll('"', '""') + '"';
  }
  return Object.freeze({ MAX, date, amount, sum, localDate, addDays, nextOccurrence, upcoming, normalize, balance, payBill, csvCell });
});
