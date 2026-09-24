/* Namaa Finance — local-first bilingual finance tracker.
 * All user records are kept in this device's browser storage unless exported.
 */

const STORAGE_KEY = "namaa-finance-v1";
const APP_VERSION = 1;

const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  transactions: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h12M4 17h8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="m17 15 3 2-3 2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  budget: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6.5c0-1.38 1.12-2.5 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="currentColor" stroke-width="1.8"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.3" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v1.5H6.5a2.5 2.5 0 0 0 0 5H20V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16.5 11h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 19h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m7 15 3-4 3 2 4-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  vault: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.8"/><path d="M12 9.2v5.6M9.2 12h5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10.9 3.6h2.2l.5 2.1c.5.18.98.46 1.4.8l2.04-.64 1.1 1.9-1.54 1.47c.1.52.1 1.05 0 1.57l1.54 1.47-1.1 1.9-2.05-.64c-.42.34-.89.61-1.4.8l-.5 2.1h-2.2l-.5-2.1c-.5-.19-.98-.46-1.4-.8l-2.05.64-1.1-1.9 1.54-1.47a5.5 5.5 0 0 1 0-1.57L5.84 7.77l1.1-1.9 2.05.64c.42-.34.89-.62 1.4-.8l.5-2.1Z" stroke="currentColor" stroke-width="1.55" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.45" stroke="currentColor" stroke-width="1.7"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 19 6v5.25c0 4.38-2.93 7.56-7 9.25-4.07-1.7-7-4.87-7-9.25V6l7-2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m8.7 11.8 2.05 2.05 4.55-4.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.7 12s3.35-5.5 9.3-5.5S21.3 12 21.3 12 17.95 17.5 12 17.5 2.7 12 2.7 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.8"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 3 18 18M10.7 6.7A10.2 10.2 0 0 1 12 6.5c5.95 0 9.3 5.5 9.3 5.5a16.56 16.56 0 0 1-3.15 3.75M6.1 6.1C3.96 7.7 2.7 12 2.7 12s3.35 5.5 9.3 5.5c1.37 0 2.6-.29 3.7-.76" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M3.9 12h16.2M12 3.5c2.05 2.15 3.05 5 3.05 8.5S14.05 18.35 12 20.5C9.95 18.35 8.95 15.5 8.95 12S9.95 5.65 12 3.5Z" stroke="currentColor" stroke-width="1.55"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 12 5-5 5 5M12 7v11" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 12 5 5 5-5M12 17V6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trendUp: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 16 6-6 3.6 3.6L20 7.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8 7.2H20v4.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trendDown: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 8 6 6 3.6-3.6L20 16.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8 16.8H20v-4.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bank: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 9 8-5 8 5H4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6.5 10v6.5M10.17 10v6.5M13.83 10v6.5M17.5 10v6.5M4 19h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  card: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.3" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M7 15h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  cash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.65"/><path d="M6.5 9.1h.01M17.5 14.9h.01" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/></svg>`,
  food: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v8M4.5 3v4.5A2.5 2.5 0 0 0 7 10h0a2.5 2.5 0 0 0 2.5-2.5V3M7 10v11M16 3v18M16 3c2.5 1.7 3.5 4 3.5 6.5H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.5 11 8.5-7 8.5 7v9H15v-5.2H9V20H3.5v-9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  transport: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 15.5 6.5 7h11l1.5 8.5M5 15.5h14M5 15.5v2.2h2.5V16M19 15.5v2.2h-2.5V16M7.5 11h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bills: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.8h12v16.4l-2.2-1.5-1.8 1.5-2-1.5-2 1.5-1.8-1.5L6 20.2V3.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="7" width="17" height="12.5" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 7V5.7A1.7 1.7 0 0 1 10.7 4h2.6A1.7 1.7 0 0 1 15 5.7V7M3.5 12h17M10 12v1.2h4V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  receipt: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.8h12v16.4l-2.2-1.5-1.8 1.5-2-1.5-2 1.5-1.8-1.5L6 20.2V3.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  repeat: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.5 7.5A7.5 7.5 0 0 0 5.9 6L4 8M5.5 16.5A7.5 7.5 0 0 0 18.1 18l1.9-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4.5V8h3.5M20 19.5V16h-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 16.8-.5 3.7 3.7-.5L18.8 8.4a2.1 2.1 0 0 0-3-3L4 16.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m13.8 6.8 3.4 3.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 7h15M9 7V4.8h6V7M7.5 7l.8 13h7.4l.8-13M10 11v5M14 11v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.5h8l4 4V20.5H6v-17Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5v4h4M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 10V7.8a3.5 3.5 0 0 1 7 0V10M12 14v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v10M8 11l4 4 4-4M5 19.5h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20V10M8 13l4-4 4 4M5 4.5h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19.5 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 10.5v5M12 7.6h.01" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  paperclip: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8.5 12.5 6.6-6.6a3 3 0 1 1 4.2 4.2l-8.1 8.1a4.5 4.5 0 0 1-6.4-6.4l7.4-7.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 10.5a5.5 5.5 0 1 1 11 0c0 6 2 6 2 7h-15c0-1 2-1 2-7ZM10 20h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11.5" height="11.5" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M16 8V6.5a2 2 0 0 0-2-2H6.5a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
};

const I18N = {
  en: {
    appName: "Namaa Finance", dashboard: "Dashboard", transactions: "Transactions", budgets: "Budgets", goals: "Goals", accounts: "Accounts", reports: "Reports", vault: "Financial vault", settings: "Preferences",
    privateOnDevice: "Private on this device", backupHint: "Back up your records anytime", personalWorkspace: "Personal workspace", overview: "Your money, in focus", hideBalances: "Hide balances", showBalances: "Show balances",
    greetingMorning: "Good morning", greetingAfternoon: "Good afternoon", greetingEvening: "Good evening", clearView: "Here is a clear view of your money this month.", addTransaction: "Add transaction", currentBalance: "Total balance", availableAcross: "Available across your accounts", incomeThisMonth: "Income this month", expenseThisMonth: "Expenses this month", savedThisMonth: "Saved this month", fromLastMonth: "from last month", cashFlow: "Cash flow", cashFlowDetail: "Income and spending over the last six months", income: "Income", expense: "Expense", recentActivity: "Recent activity", seeAll: "See all", thisMonth: "This month", budgetProgress: "Budget progress", spendingByCategory: "Spending by category", upcomingPayments: "Upcoming payments", quickActions: "Quick actions", addExpense: "Add expense", addIncome: "Add income", createBudget: "Create budget", createGoal: "Create goal",
    manageTransactions: "Keep every income and expense in one clear timeline.", searchTransactions: "Search transactions", all: "All", noTransactions: "No transactions found", noTransactionsDetail: "Add your first income or expense to start building your financial picture.", date: "Date", description: "Description", category: "Category", account: "Account", type: "Type", amount: "Amount", actions: "Actions", edit: "Edit", delete: "Delete", recurring: "Recurring", once: "One time",
    manageBudgets: "Set spending limits and see what remains at a glance.", noBudgets: "No budgets yet", noBudgetsDetail: "Create a category budget for better spending control.", spent: "spent", remaining: "remaining", of: "of", addBudget: "Add budget",
    manageGoals: "Turn your plans into steady, visible progress.", noGoals: "No goals yet", noGoalsDetail: "Start with one meaningful goal and fund it at your own pace.", addGoal: "Add goal", contributed: "saved", target: "target", due: "Due", contribute: "Add money",
    manageAccounts: "See your cash, bank accounts, and cards in one place.", noAccounts: "No accounts yet", noAccountsDetail: "Add an account to place your transactions in context.", addAccount: "Add account", openingBalance: "Opening balance", accountType: "Account type", currentBalanceLabel: "Current balance",
    manageReports: "Make sense of your spending and take the next best step.", downloadCsv: "Download CSV", monthlySnapshot: "Monthly snapshot", healthyPace: "You are keeping more than you spend this month.", ofIncomeSaved: "of income saved", plannedBudget: "of planned budgets used", topCategories: "Top spending categories", incomeVsExpenses: "Income vs. expenses",
    manageVault: "Store the financial details that do not fit into a transaction.", addRecord: "Add record", noRecords: "No records yet", noRecordsDetail: "Save an insurance detail, loan note, tax reminder, or any private financial reference.", updated: "Updated",
    manageSettings: "Choose how your private workspace looks and behaves.", appearance: "Appearance & privacy", privacyBlur: "Privacy blur", privacyBlurDetail: "Hide balance values until you choose to reveal them.", language: "Language", languageDetail: "Use Namaa Finance in Arabic or English.", currency: "Display currency", currencyDetail: "Changes labels only; it does not convert existing amounts.", dataBackup: "Data backup", dataBackupDetail: "Keep a portable copy of your private records.", reminders: "Monthly review reminder", remindersDetail: "A gentle prompt to check your money plan.", deviceOnly: "Your records stay on this device", deviceOnlyDetail: "This version does not send your financial records to a cloud service.", exportBackup: "Back up data", restoreBackup: "Restore backup", exportCsv: "Export transactions as CSV",
    addTransactionTitle: "Add transaction", editTransactionTitle: "Edit transaction", addTransactionDetail: "Record it now; your balances and reports update instantly.", editTransactionDetail: "Update the details and keep your record accurate.", transactionType: "Transaction type", incomeType: "Income", expenseType: "Expense", note: "Note", optional: "Optional", saveTransaction: "Save transaction", updateTransaction: "Update transaction", cancel: "Cancel", recordAdded: "Transaction saved", recordUpdated: "Transaction updated", recordDeleted: "Transaction deleted", chooseCategory: "Choose a category", chooseAccount: "Choose an account", recurringHint: "Recurring entries will appear in your upcoming payment list.", frequency: "Frequency", monthly: "Monthly", weekly: "Weekly", yearly: "Yearly",
    addBudgetTitle: "Create a budget", addBudgetDetail: "Set a monthly limit for a spending category.", budgetName: "Budget category", monthlyLimit: "Monthly limit", saveBudget: "Create budget", budgetAdded: "Budget created", budgetDeleted: "Budget deleted",
    addGoalTitle: "Create a goal", addGoalDetail: "Name the goal, decide the target, and make progress visible.", goalName: "Goal name", targetAmount: "Target amount", savedAlready: "Already saved", targetDate: "Target date", saveGoal: "Create goal", goalAdded: "Goal created", goalDeleted: "Goal deleted", contributeTitle: "Add to goal", contributeDetail: "This updates progress without changing your account balance.", contributionAmount: "Contribution amount", saveContribution: "Add contribution", contributionAdded: "Goal updated",
    addAccountTitle: "Add an account", addAccountDetail: "Use separate accounts to understand where your money is held.", accountName: "Account name", saveAccount: "Add account", accountAdded: "Account added", accountDeleted: "Account deleted", cashAccount: "Cash", bankAccount: "Bank account", cardAccount: "Debit / credit card", savingsAccount: "Savings account",
    addRecordTitle: "Add financial record", addRecordDetail: "A private note for important financial information.", recordTitle: "Record title", recordType: "Record type", recordValue: "Value or reference", recordNotes: "Notes", saveRecord: "Save record", recordAdded: "Record saved", recordDeleted: "Record deleted", insurance: "Insurance", loan: "Loan / debt", tax: "Tax", contract: "Contract", document: "Document", other: "Other",
    backupTitle: "Back up your records", backupDetail: "Choose a secure place you control. Files are not sent anywhere by this app.", downloadBackup: "Download full backup", downloadBackupDetail: "Exports all records in a restorable JSON file.", importBackup: "Restore from backup", importBackupDetail: "Replaces current on-device data after your confirmation.", downloadTransactions: "Download transaction CSV", downloadTransactionsDetail: "Useful for spreadsheets and personal reporting.", backupDownloaded: "Backup downloaded", csvDownloaded: "CSV downloaded", backupRestored: "Backup restored", invalidBackup: "This file is not a valid Namaa backup.", confirmDelete: "Delete this item? This cannot be undone.", confirmRestore: "Replace your current on-device records with this backup?", close: "Close", systemBackup: "System backup", budget: "Budget", financialRecord: "Financial record",
    noUpcoming: "No recurring payments scheduled", noUpcomingDetail: "Set the recurring option when adding a transaction.", goalFund: "Goal fund", viewSettings: "View preferences", month: "Month", categoryBreakdown: "Category breakdown", available: "Available", allAccounts: "All accounts", updatedToday: "Updated today", newEntry: "New entry", invalidAmount: "Enter an amount greater than zero.", completeRequired: "Complete the required fields.", validMonthlyLimit: "Enter a valid monthly limit.", completeGoal: "Complete the goal details.", completeAccount: "Complete the account details.", accountInUse: "Move or delete the account's transactions first."
  },
  ar: {
    appName: "نماء للمال", dashboard: "لوحة التحكم", transactions: "العمليات", budgets: "الميزانيات", goals: "الأهداف", accounts: "الحسابات", reports: "التقارير", vault: "السجل المالي", settings: "التفضيلات",
    privateOnDevice: "خاص على هذا الجهاز", backupHint: "انسخ سجلاتك احتياطياً في أي وقت", personalWorkspace: "مساحة مالية شخصية", overview: "أموالك في صورة واضحة", hideBalances: "إخفاء الأرصدة", showBalances: "إظهار الأرصدة",
    greetingMorning: "صباح الخير", greetingAfternoon: "مساء الخير", greetingEvening: "مساء الخير", clearView: "هذه صورة واضحة لأموالك خلال هذا الشهر.", addTransaction: "إضافة عملية", currentBalance: "إجمالي الرصيد", availableAcross: "متاح عبر حساباتك", incomeThisMonth: "دخل هذا الشهر", expenseThisMonth: "مصروفات هذا الشهر", savedThisMonth: "المدخر هذا الشهر", fromLastMonth: "مقارنة بالشهر الماضي", cashFlow: "التدفق النقدي", cashFlowDetail: "الدخل والإنفاق خلال آخر ستة أشهر", income: "دخل", expense: "مصروف", recentActivity: "أحدث العمليات", seeAll: "عرض الكل", thisMonth: "هذا الشهر", budgetProgress: "تقدم الميزانيات", spendingByCategory: "الإنفاق حسب الفئة", upcomingPayments: "مدفوعات قادمة", quickActions: "إجراءات سريعة", addExpense: "إضافة مصروف", addIncome: "إضافة دخل", createBudget: "إنشاء ميزانية", createGoal: "إنشاء هدف",
    manageTransactions: "سجّل كل دخل ومصروف في تسلسل واضح وسهل المتابعة.", searchTransactions: "ابحث في العمليات", all: "الكل", noTransactions: "لا توجد عمليات مطابقة", noTransactionsDetail: "أضف أول دخل أو مصروف لتبدأ بتكوين صورة مالية واضحة.", date: "التاريخ", description: "الوصف", category: "الفئة", account: "الحساب", type: "النوع", amount: "المبلغ", actions: "إجراءات", edit: "تعديل", delete: "حذف", recurring: "متكرر", once: "مرة واحدة",
    manageBudgets: "ضع حدود الإنفاق وشاهد ما تبقى بنظرة واحدة.", noBudgets: "لا توجد ميزانيات بعد", noBudgetsDetail: "أنشئ ميزانية لفئة واحدة لتبدأ ضبط إنفاقك.", spent: "تم إنفاقه", remaining: "متبقٍ", of: "من", addBudget: "إضافة ميزانية",
    manageGoals: "حوّل خططك إلى تقدم منتظم ومرئي.", noGoals: "لا توجد أهداف بعد", noGoalsDetail: "ابدأ بهدف مهم وموّله بالوتيرة التي تناسبك.", addGoal: "إضافة هدف", contributed: "تم ادخاره", target: "الهدف", due: "الموعد", contribute: "إضافة مبلغ",
    manageAccounts: "اطّلع على النقد والحسابات والبطاقات في مكان واحد.", noAccounts: "لا توجد حسابات بعد", noAccountsDetail: "أضف حساباً لتصبح عملياتك أكثر وضوحاً.", addAccount: "إضافة حساب", openingBalance: "الرصيد الافتتاحي", accountType: "نوع الحساب", currentBalanceLabel: "الرصيد الحالي",
    manageReports: "افهم إنفاقك واتخذ الخطوة الأفضل التالية.", downloadCsv: "تنزيل CSV", monthlySnapshot: "ملخص الشهر", healthyPace: "تحتفظ هذا الشهر بأكثر مما تنفق.", ofIncomeSaved: "من الدخل تم ادخاره", plannedBudget: "من الميزانيات المخططة تم استخدامه", topCategories: "أعلى فئات الإنفاق", incomeVsExpenses: "الدخل مقابل المصروفات",
    manageVault: "احتفظ بالتفاصيل المالية التي لا تناسب عمليةً مالية محددة.", addRecord: "إضافة سجل", noRecords: "لا توجد سجلات بعد", noRecordsDetail: "احفظ تفاصيل تأمين أو قرض أو تذكير ضريبي أو أي مرجع مالي خاص.", updated: "آخر تحديث",
    manageSettings: "اختر كيف تظهر وتعمل مساحتك المالية الخاصة.", appearance: "المظهر والخصوصية", privacyBlur: "تمويه الخصوصية", privacyBlurDetail: "أخفِ قيم الأرصدة إلى أن تختار إظهارها.", language: "اللغة", languageDetail: "استخدم نماء للمال بالعربية أو الإنجليزية.", currency: "عملة العرض", currencyDetail: "تغيّر التسمية فقط ولا تحوّل المبالغ الحالية.", dataBackup: "نسخة احتياطية للبيانات", dataBackupDetail: "احتفظ بنسخة قابلة للنقل من سجلاتك الخاصة.", reminders: "تذكير بالمراجعة الشهرية", remindersDetail: "تنبيه لطيف لمراجعة خطتك المالية.", deviceOnly: "تبقى سجلاتك على هذا الجهاز", deviceOnlyDetail: "لا ترسل هذه النسخة سجلاتك المالية إلى خدمة سحابية.", exportBackup: "نسخ البيانات", restoreBackup: "استعادة نسخة", exportCsv: "تصدير العمليات CSV",
    addTransactionTitle: "إضافة عملية", editTransactionTitle: "تعديل العملية", addTransactionDetail: "سجّلها الآن؛ ستتحدّث الأرصدة والتقارير مباشرة.", editTransactionDetail: "حدّث التفاصيل للحفاظ على دقة سجلك.", transactionType: "نوع العملية", incomeType: "دخل", expenseType: "مصروف", note: "ملاحظة", optional: "اختياري", saveTransaction: "حفظ العملية", updateTransaction: "تحديث العملية", cancel: "إلغاء", recordAdded: "تم حفظ العملية", recordUpdated: "تم تحديث العملية", recordDeleted: "تم حذف العملية", chooseCategory: "اختر فئة", chooseAccount: "اختر حساباً", recurringHint: "ستظهر العمليات المتكررة ضمن قائمة المدفوعات القادمة.", frequency: "التكرار", monthly: "شهري", weekly: "أسبوعي", yearly: "سنوي",
    addBudgetTitle: "إنشاء ميزانية", addBudgetDetail: "ضع حداً شهرياً لفئة من فئات الإنفاق.", budgetName: "فئة الميزانية", monthlyLimit: "الحد الشهري", saveBudget: "إنشاء الميزانية", budgetAdded: "تم إنشاء الميزانية", budgetDeleted: "تم حذف الميزانية",
    addGoalTitle: "إنشاء هدف", addGoalDetail: "سمِّ الهدف، حدد المبلغ، واجعل تقدمك مرئياً.", goalName: "اسم الهدف", targetAmount: "المبلغ المستهدف", savedAlready: "المدخر حالياً", targetDate: "تاريخ الهدف", saveGoal: "إنشاء الهدف", goalAdded: "تم إنشاء الهدف", goalDeleted: "تم حذف الهدف", contributeTitle: "إضافة للهدف", contributeDetail: "يُحدّث هذا التقدم ولا يغير رصيد الحساب.", contributionAmount: "مبلغ الإضافة", saveContribution: "إضافة مبلغ", contributionAdded: "تم تحديث الهدف",
    addAccountTitle: "إضافة حساب", addAccountDetail: "استخدم حسابات منفصلة لمعرفة أين توجد أموالك.", accountName: "اسم الحساب", saveAccount: "إضافة الحساب", accountAdded: "تمت إضافة الحساب", accountDeleted: "تم حذف الحساب", cashAccount: "نقد", bankAccount: "حساب بنكي", cardAccount: "بطاقة خصم / ائتمان", savingsAccount: "حساب ادخار",
    addRecordTitle: "إضافة سجل مالي", addRecordDetail: "ملاحظة خاصة للمعلومات المالية المهمة.", recordTitle: "عنوان السجل", recordType: "نوع السجل", recordValue: "قيمة أو مرجع", recordNotes: "ملاحظات", saveRecord: "حفظ السجل", recordAdded: "تم حفظ السجل", recordDeleted: "تم حذف السجل", insurance: "تأمين", loan: "قرض / دين", tax: "ضريبة", contract: "عقد", document: "وثيقة", other: "أخرى",
    backupTitle: "نسخ سجلاتك احتياطياً", backupDetail: "اختر مكاناً آمناً تتحكم به. لا يرسل التطبيق الملفات إلى أي جهة.", downloadBackup: "تنزيل نسخة كاملة", downloadBackupDetail: "يُصدر كل السجلات في ملف JSON قابل للاستعادة.", importBackup: "استعادة من نسخة", importBackupDetail: "يستبدل بيانات هذا الجهاز بعد تأكيدك.", downloadTransactions: "تنزيل CSV للعمليات", downloadTransactionsDetail: "مفيد للجداول والتقارير الشخصية.", backupDownloaded: "تم تنزيل النسخة الاحتياطية", csvDownloaded: "تم تنزيل ملف CSV", backupRestored: "تمت استعادة النسخة", invalidBackup: "هذا الملف ليس نسخة نماء صالحة.", confirmDelete: "هل تريد حذف هذا العنصر؟ لا يمكن التراجع عن ذلك.", confirmRestore: "هل تريد استبدال سجلات هذا الجهاز بهذه النسخة؟", close: "إغلاق", systemBackup: "نسخة النظام", budget: "ميزانية", financialRecord: "سجل مالي",
    noUpcoming: "لا توجد مدفوعات متكررة مجدولة", noUpcomingDetail: "فعّل خيار التكرار عند إضافة عملية جديدة.", goalFund: "صندوق الهدف", viewSettings: "عرض التفضيلات", month: "الشهر", categoryBreakdown: "تفصيل حسب الفئة", available: "متاح", allAccounts: "كل الحسابات", updatedToday: "تم التحديث اليوم", newEntry: "سجل جديد", invalidAmount: "أدخل مبلغاً أكبر من صفر.", completeRequired: "أكمل الحقول المطلوبة.", validMonthlyLimit: "أدخل حداً شهرياً صحيحاً.", completeGoal: "أكمل تفاصيل الهدف.", completeAccount: "أكمل تفاصيل الحساب.", accountInUse: "انقل أو احذف عمليات هذا الحساب أولاً."
  }
};

const CATEGORY_META = {
  salary: { icon: "briefcase", color: "green", type: "income", en: "Salary", ar: "راتب" },
  freelance: { icon: "briefcase", color: "blue", type: "income", en: "Freelance", ar: "عمل حر" },
  investments: { icon: "trendUp", color: "purple", type: "income", en: "Investment return", ar: "عائد استثمار" },
  otherIncome: { icon: "arrowUp", color: "green", type: "income", en: "Other income", ar: "دخل آخر" },
  food: { icon: "food", color: "coral", type: "expense", en: "Food & groceries", ar: "طعام وبقالة" },
  housing: { icon: "home", color: "blue", type: "expense", en: "Housing", ar: "سكن" },
  utilities: { icon: "bills", color: "gold", type: "expense", en: "Utilities & bills", ar: "فواتير وخدمات" },
  transport: { icon: "transport", color: "purple", type: "expense", en: "Transport", ar: "مواصلات" },
  health: { icon: "shield", color: "green", type: "expense", en: "Health", ar: "صحة" },
  education: { icon: "file", color: "blue", type: "expense", en: "Education", ar: "تعليم" },
  shopping: { icon: "card", color: "coral", type: "expense", en: "Shopping", ar: "تسوق" },
  entertainment: { icon: "target", color: "purple", type: "expense", en: "Entertainment", ar: "ترفيه" },
  otherExpense: { icon: "receipt", color: "gold", type: "expense", en: "Other expense", ar: "مصروف آخر" }
};

const ACCOUNT_META = {
  cash: { icon: "cash", en: "Cash", ar: "نقد" },
  bank: { icon: "bank", en: "Bank account", ar: "حساب بنكي" },
  card: { icon: "card", en: "Debit / credit card", ar: "بطاقة خصم / ائتمان" },
  savings: { icon: "wallet", en: "Savings account", ar: "حساب ادخار" }
};

const NOTE_TYPES = {
  insurance: { icon: "shield", color: "green" },
  loan: { icon: "receipt", color: "coral" },
  tax: { icon: "file", color: "gold" },
  contract: { icon: "paperclip", color: "blue" },
  document: { icon: "file", color: "purple" },
  other: { icon: "vault", color: "green" }
};

function uid(prefix = "item") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function isoDate(dayOffset = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

function earlierThisMonth(day) {
  const now = new Date();
  const safeDay = Math.min(day, now.getDate());
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(Math.max(safeDay, 1)).padStart(2, "0")}`;
}

function nextDateWithDay(day) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), day);
  if (target < new Date(now.getFullYear(), now.getMonth(), now.getDate())) target.setMonth(target.getMonth() + 1);
  return target.toISOString().slice(0, 10);
}

function createDefaultState() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  return {
    version: APP_VERSION,
    profile: { name: "Namaa User" },
    language: navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en",
    currency: "JOD",
    privacyMode: false,
    preferences: { monthlyReminder: true },
    accounts: [
      { id: "account-bank", name: "Main Bank", type: "bank", openingBalance: 680 },
      { id: "account-cash", name: "Cash wallet", type: "cash", openingBalance: 160 },
      { id: "account-savings", name: "Emergency savings", type: "savings", openingBalance: 1100 }
    ],
    transactions: [
      { id: "t-salary", description: "Monthly salary", amount: 1250, type: "income", category: "salary", accountId: "account-bank", date: earlierThisMonth(3), note: "", recurring: true, frequency: "monthly" },
      { id: "t-freelance", description: "Project payment", amount: 420, type: "income", category: "freelance", accountId: "account-bank", date: earlierThisMonth(8), note: "Website research support", recurring: false, frequency: "monthly" },
      { id: "t-rent", description: "Apartment rent", amount: 250, type: "expense", category: "housing", accountId: "account-bank", date: earlierThisMonth(5), note: "", recurring: true, frequency: "monthly" },
      { id: "t-electricity", description: "Electricity bill", amount: 52, type: "expense", category: "utilities", accountId: "account-bank", date: earlierThisMonth(12), note: "", recurring: true, frequency: "monthly" },
      { id: "t-market", description: "Weekly groceries", amount: 74.2, type: "expense", category: "food", accountId: "account-cash", date: earlierThisMonth(15), note: "", recurring: false, frequency: "monthly" },
      { id: "t-fuel", description: "Fuel refill", amount: 38, type: "expense", category: "transport", accountId: "account-cash", date: earlierThisMonth(18), note: "", recurring: false, frequency: "monthly" },
      { id: "t-internet", description: "Home internet", amount: 28, type: "expense", category: "utilities", accountId: "account-bank", date: earlierThisMonth(20), note: "", recurring: true, frequency: "monthly" },
      { id: "t-coffee", description: "Coffee with a friend", amount: 6.5, type: "expense", category: "food", accountId: "account-cash", date: earlierThisMonth(22), note: "", recurring: false, frequency: "monthly" },
      { id: "t-medicine", description: "Pharmacy", amount: 18.8, type: "expense", category: "health", accountId: "account-cash", date: earlierThisMonth(24), note: "", recurring: false, frequency: "monthly" }
    ],
    budgets: [
      { id: "b-food", category: "food", limit: 220 },
      { id: "b-utilities", category: "utilities", limit: 120 },
      { id: "b-transport", category: "transport", limit: 95 },
      { id: "b-shopping", category: "shopping", limit: 150 }
    ],
    goals: [
      { id: "g-emergency", name: "Emergency fund", target: 2000, saved: 1180, dueDate: `${nextYear}-03-30`, icon: "shield", color: "green" },
      { id: "g-travel", name: "Family trip", target: 850, saved: 315, dueDate: `${nextYear}-06-20`, icon: "target", color: "gold" }
    ],
    vaultNotes: [
      { id: "v-insurance", title: "Health insurance renewal", type: "insurance", value: "Policy ending 6724", notes: "Review the renewal offer two weeks before expiry.", updatedAt: isoDate(-2) },
      { id: "v-tax", title: "Annual tax records", type: "tax", value: "Folder: Tax / current year", notes: "Keep invoices and income records for the annual filing.", updatedAt: isoDate(-7) }
    ]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.transactions)) return createDefaultState();
    return {
      ...createDefaultState(),
      ...parsed,
      profile: { ...createDefaultState().profile, ...(parsed.profile || {}) },
      preferences: { ...createDefaultState().preferences, ...(parsed.preferences || {}) },
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : [],
      budgets: Array.isArray(parsed.budgets) ? parsed.budgets : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
      vaultNotes: Array.isArray(parsed.vaultNotes) ? parsed.vaultNotes : []
    };
  } catch {
    return createDefaultState();
  }
}

let state = loadState();
let currentPage = "dashboard";
let transactionFilter = "all";
let transactionSearch = "";

function saveState() {
  state.version = APP_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function t(key) {
  return I18N[state.language]?.[key] ?? I18N.en[key] ?? key;
}

function langValue(object) {
  return object?.[state.language] || object?.en || "";
}

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  return ICONS[name] || ICONS.receipt;
}

function categoryLabel(id) {
  return langValue(CATEGORY_META[id]) || id;
}

function accountLabel(account) {
  return account?.name || t("allAccounts");
}

function accountTypeLabel(type) {
  return langValue(ACCOUNT_META[type]) || type;
}

function noteTypeLabel(type) {
  return t(type) || type;
}

function getLocale() {
  return state.language === "ar" ? "ar-JO" : "en-GB";
}

function currencySymbol() {
  const symbols = { JOD: state.language === "ar" ? "د.أ" : "JOD", USD: "$", EUR: "€", GBP: "£", AED: "د.إ", SAR: "ر.س" };
  return symbols[state.currency] || state.currency;
}

function money(value, signed = false) {
  const abs = Math.abs(Number(value) || 0);
  const number = new Intl.NumberFormat(getLocale(), { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(abs);
  const sign = signed && value > 0 ? "+" : signed && value < 0 ? "−" : "";
  return state.language === "ar" ? `${sign}${number} ${currencySymbol()}` : `${sign}${currencySymbol()} ${number}`;
}

function dateLabel(date, opts = { day: "numeric", month: "short" }) {
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(getLocale(), opts).format(parsed);
}

function monthLabel(date = new Date()) {
  return new Intl.DateTimeFormat(getLocale(), { month: "long", year: "numeric" }).format(date);
}

function isCurrentMonth(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function monthTransactions() {
  return state.transactions.filter((tx) => isCurrentMonth(tx.date));
}

function sumTransactions(list, type) {
  return list.filter((tx) => tx.type === type).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
}

function accountBalance(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  const opening = Number(account?.openingBalance || 0);
  return opening + state.transactions
    .filter((tx) => tx.accountId === accountId)
    .reduce((sum, tx) => sum + (tx.type === "income" ? Number(tx.amount) : -Number(tx.amount)), 0);
}

function totalBalance() {
  return state.accounts.reduce((sum, account) => sum + accountBalance(account.id), 0);
}

function budgetSpend(category) {
  return monthTransactions()
    .filter((tx) => tx.type === "expense" && tx.category === category)
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
}

function transactionIconClass(tx) {
  return tx.type === "income" ? "salary" : (CATEGORY_META[tx.category]?.color || "");
}

function transactionIcon(tx) {
  return icon(CATEGORY_META[tx.category]?.icon || (tx.type === "income" ? "arrowUp" : "receipt"));
}

function sortedTransactions() {
  return [...state.transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

function monthIncome() { return sumTransactions(monthTransactions(), "income"); }
function monthExpense() { return sumTransactions(monthTransactions(), "expense"); }
function monthSaved() { return monthIncome() - monthExpense(); }

function spentByCategory() {
  const map = {};
  monthTransactions().filter((tx) => tx.type === "expense").forEach((tx) => {
    map[tx.category] = (map[tx.category] || 0) + Number(tx.amount);
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function getUpcoming() {
  const recurring = state.transactions.filter((tx) => tx.recurring);
  return recurring.map((tx) => {
    const original = new Date(`${tx.date}T12:00:00`);
    const dueDate = nextDateWithDay(original.getDate());
    return { ...tx, dueDate };
  }).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 4);
}

function percentage(value, max) {
  if (!max) return 0;
  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}

function friendlyDayDifference(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateString}T00:00:00`);
  const days = Math.round((target - today) / 86400000);
  if (state.language === "ar") return days === 0 ? "اليوم" : days === 1 ? "غداً" : `بعد ${days} أيام`;
  return days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
}

function renderIcons(scope = document) {
  scope.querySelectorAll("[data-icon]").forEach((node) => {
    const glyph = icon(node.dataset.icon);
    if (node.dataset.iconRendered !== node.dataset.icon) {
      node.innerHTML = glyph;
      node.dataset.iconRendered = node.dataset.icon;
    }
  });
}

function applyLanguage() {
  const html = document.documentElement;
  html.lang = state.language;
  html.dir = state.language === "ar" ? "rtl" : "ltr";
  document.title = t("appName");
  const label = document.getElementById("languageLabel");
  if (label) label.textContent = state.language === "ar" ? "English" : "العربية";
  const profileName = document.getElementById("profileName");
  if (profileName) profileName.textContent = state.profile.name;
  const privacyButton = document.getElementById("privacyToggle");
  if (privacyButton) {
    privacyButton.dataset.icon = state.privacyMode ? "eyeOff" : "eye";
    privacyButton.dataset.iconRendered = "";
    privacyButton.setAttribute("aria-label", state.privacyMode ? t("showBalances") : t("hideBalances"));
    privacyButton.title = state.privacyMode ? t("showBalances") : t("hideBalances");
  }
}

const NAV_ITEMS = [
  ["dashboard", "dashboard"], ["transactions", "transactions"], ["budgets", "budget"], ["goals", "target"],
  ["accounts", "wallet"], ["reports", "chart"], ["vault", "vault"], ["settings", "settings"]
];

function navButton(page, iconName, compact = false) {
  const active = currentPage === page ? "active" : "";
  return `<button class="nav-item ${active}" type="button" data-page="${page}" aria-current="${currentPage === page ? "page" : "false"}">
    <span data-icon="${iconName}"></span><span class="nav-label">${esc(t(page))}</span>
  </button>`;
}

function renderNavigation() {
  document.getElementById("sideNav").innerHTML = NAV_ITEMS.map(([page, iconName]) => navButton(page, iconName)).join("");
  document.getElementById("mobileNav").innerHTML = NAV_ITEMS.slice(0, 5).map(([page, iconName]) => navButton(page, iconName, true)).join("");
}

function pageMeta(page) {
  const meta = {
    dashboard: [t("overview"), t("dashboard")],
    transactions: [monthLabel(), t("transactions")],
    budgets: [monthLabel(), t("budgets")],
    goals: [t("overview"), t("goals")],
    accounts: [t("overview"), t("accounts")],
    reports: [monthLabel(), t("reports")],
    vault: [t("privateOnDevice"), t("vault")],
    settings: [t("personalWorkspace"), t("settings")]
  };
  return meta[page] || meta.dashboard;
}

function renderHeader() {
  const [eyebrow, title] = pageMeta(currentPage);
  document.getElementById("pageEyebrow").textContent = eyebrow;
  document.getElementById("pageTitle").textContent = title;
}

function visibilityClass() { return state.privacyMode ? "privacy-mask" : ""; }

function currencyText(value, signed = false, extra = "") {
  return `<span class="${visibilityClass()} ${extra}">${money(value, signed)}</span>`;
}

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? t("greetingMorning") : hour < 18 ? t("greetingAfternoon") : t("greetingEvening");
}

function renderDashboard() {
  const income = monthIncome();
  const expense = monthExpense();
  const saved = monthSaved();
  const total = totalBalance();
  const recent = sortedTransactions().slice(0, 5);
  const budgets = state.budgets.slice(0, 4);
  const upcoming = getUpcoming();
  return `
    <section class="dashboard-top">
      <div>
        <h2>${esc(greeting())}, ${esc(state.profile.name)}</h2>
        <p>${esc(t("clearView"))}</p>
      </div>
      <button class="primary-button" type="button" data-action="add-transaction">${icon("plus")}<span>${esc(t("addTransaction"))}</span></button>
    </section>
    <section class="summary-grid" aria-label="${esc(t("monthlySnapshot"))}">
      <article class="summary-card balance">
        <p class="card-kicker"><span class="status-dot"></span>${esc(t("currentBalance"))}</p>
        <p class="metric-amount ${visibilityClass()}">${money(total)}</p>
        <p class="metric-detail">${icon("wallet")}<span>${esc(t("availableAcross"))}</span></p>
      </article>
      <article class="summary-card">
        <span class="metric-icon">${icon("arrowUp")}</span>
        <p class="card-kicker">${esc(t("incomeThisMonth"))}</p>
        <p class="metric-amount ${visibilityClass()}">${money(income)}</p>
        <p class="metric-detail positive">${icon("trendUp")}<span>+12.4% ${esc(t("fromLastMonth"))}</span></p>
      </article>
      <article class="summary-card">
        <span class="metric-icon expense">${icon("arrowDown")}</span>
        <p class="card-kicker">${esc(t("expenseThisMonth"))}</p>
        <p class="metric-amount ${visibilityClass()}">${money(expense)}</p>
        <p class="metric-detail negative">${icon("trendDown")}<span>−5.8% ${esc(t("fromLastMonth"))}</span></p>
      </article>
      <article class="summary-card">
        <span class="metric-icon saved">${icon("target")}</span>
        <p class="card-kicker">${esc(t("savedThisMonth"))}</p>
        <p class="metric-amount ${visibilityClass()}">${money(saved)}</p>
        <p class="metric-detail ${saved >= 0 ? "positive" : "negative"}">${icon(saved >= 0 ? "trendUp" : "trendDown")}<span>${saved >= 0 ? "18.6%" : "0%"} ${esc(t("ofIncomeSaved"))}</span></p>
      </article>
    </section>
    <section class="dashboard-grid">
      <div class="stack">
        ${renderCashFlowPanel()}
        <article class="panel">
          <div class="panel-heading">
            <div><h3>${esc(t("recentActivity"))}</h3><p>${esc(t("thisMonth"))}</p></div>
            <button class="quiet-button" type="button" data-page="transactions">${esc(t("seeAll"))}${icon("chevron")}</button>
          </div>
          <div class="transaction-list">${recent.length ? recent.map(renderTransactionListItem).join("") : renderEmptyMini(t("noTransactions"), "receipt")}</div>
        </article>
      </div>
      <div class="stack">
        <article class="panel budget-panel">
          <div class="panel-heading">
            <div><h3>${esc(t("budgetProgress"))}</h3><p>${esc(monthLabel())}</p></div>
            <button class="quiet-button" type="button" data-page="budgets">${esc(t("seeAll"))}${icon("chevron")}</button>
          </div>
          <div class="budget-list">${budgets.length ? budgets.map(renderBudgetListItem).join("") : renderEmptyMini(t("noBudgets"), "budget")}</div>
        </article>
        <article class="panel spending-panel">
          <div class="panel-heading"><div><h3>${esc(t("spendingByCategory"))}</h3><p>${esc(t("thisMonth"))}</p></div></div>
          ${renderSpendingDonut()}
        </article>
        <article class="panel">
          <div class="panel-heading"><div><h3>${esc(t("upcomingPayments"))}</h3><p>${esc(t("recurring"))}</p></div></div>
          <div class="upcoming-list">${upcoming.length ? upcoming.map(renderUpcomingItem).join("") : renderEmptyMini(t("noUpcoming"), "clock")}</div>
        </article>
        <article class="panel">
          <div class="panel-heading"><div><h3>${esc(t("quickActions"))}</h3></div></div>
          <div class="quick-actions">
            <button class="quick-action" type="button" data-action="quick-expense"><span>${icon("arrowDown")}</span>${esc(t("addExpense"))}</button>
            <button class="quick-action" type="button" data-action="quick-income"><span>${icon("arrowUp")}</span>${esc(t("addIncome"))}</button>
            <button class="quick-action" type="button" data-action="add-budget"><span>${icon("budget")}</span>${esc(t("createBudget"))}</button>
            <button class="quick-action" type="button" data-action="add-goal"><span>${icon("target")}</span>${esc(t("createGoal"))}</button>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderCashFlowPanel() {
  const income = monthIncome();
  const expense = monthExpense();
  const dataIncome = [920, 980, 1130, 1060, 1190, Math.max(income, 860)];
  const dataExpense = [660, 710, 630, 750, 695, Math.max(expense, 310)];
  const labels = [];
  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    labels.push(new Intl.DateTimeFormat(getLocale(), { month: "short" }).format(date));
  }
  const max = Math.max(...dataIncome, ...dataExpense, 1) * 1.15;
  const point = (value, index) => `${41 + index * 62},${184 - (value / max) * 142}`;
  const pointsIncome = dataIncome.map(point).join(" ");
  const pointsExpense = dataExpense.map(point).join(" ");
  const areaPoints = `41,184 ${pointsIncome} 351,184`;
  return `<article class="panel cashflow-panel">
    <div class="panel-heading"><div><h3>${esc(t("cashFlow"))}</h3><p>${esc(t("cashFlowDetail"))}</p></div><button class="quiet-button" type="button" data-page="reports">${esc(t("reports"))}${icon("chevron")}</button></div>
    <div class="chart-legend"><span class="legend-item"><i class="legend-swatch"></i>${esc(t("income"))}</span><span class="legend-item"><i class="legend-swatch expense"></i>${esc(t("expense"))}</span></div>
    <svg class="line-chart" viewBox="0 0 390 220" preserveAspectRatio="none" role="img" aria-label="${esc(t("cashFlow"))}">
      <defs><linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0aa57a" stop-opacity=".18"/><stop offset="1" stop-color="#0aa57a" stop-opacity="0"/></linearGradient></defs>
      <line class="grid-line" x1="40" y1="42" x2="372" y2="42"/><line class="grid-line" x1="40" y1="89" x2="372" y2="89"/><line class="grid-line" x1="40" y1="136" x2="372" y2="136"/><line class="grid-line" x1="40" y1="184" x2="372" y2="184"/>
      <polygon class="area-income" points="${areaPoints}"/><polyline class="income-line" points="${pointsIncome}"/><polyline class="expense-line" points="${pointsExpense}"/>
      ${dataIncome.map((value, index) => `<circle class="point-income" cx="${point(value, index).split(",")[0]}" cy="${point(value, index).split(",")[1]}" r="3.2"/>`).join("")}
      ${dataExpense.map((value, index) => `<circle class="point-expense" cx="${point(value, index).split(",")[0]}" cy="${point(value, index).split(",")[1]}" r="3.2"/>`).join("")}
      ${labels.map((label, index) => `<text class="axis-label" x="${41 + index * 62}" y="207" text-anchor="middle">${esc(label)}</text>`).join("")}
    </svg>
  </article>`;
}

function renderTransactionListItem(tx) {
  const account = state.accounts.find((item) => item.id === tx.accountId);
  return `<div class="transaction-row">
    <span class="transaction-icon ${transactionIconClass(tx)}">${transactionIcon(tx)}</span>
    <span class="transaction-copy"><strong>${esc(tx.description)}</strong><small>${esc(categoryLabel(tx.category))} · ${esc(accountLabel(account))}</small></span>
    <span class="transaction-amount"><strong class="${tx.type === "income" ? "income" : ""} ${visibilityClass()}">${money(tx.type === "income" ? tx.amount : -tx.amount, true)}</strong><small>${esc(dateLabel(tx.date))}</small></span>
  </div>`;
}

function renderBudgetListItem(budget) {
  const spent = budgetSpend(budget.category);
  const ratio = percentage(spent, budget.limit);
  const status = ratio > 100 ? "over" : ratio > 78 ? "warn" : "";
  return `<div class="budget-item">
    <div class="budget-label"><span>${esc(categoryLabel(budget.category))}</span><small class="${visibilityClass()}">${money(spent)} ${esc(t("of"))} ${money(budget.limit)}</small></div>
    <div class="progress-track"><div class="progress-bar ${status}" style="width:${ratio}%"></div></div>
    <div class="budget-foot"><span>${ratio}% ${esc(t("spent"))}</span><span class="${visibilityClass()}">${money(Math.max(budget.limit - spent, 0))} ${esc(t("remaining"))}</span></div>
  </div>`;
}

function renderSpendingDonut() {
  const categories = spentByCategory().slice(0, 4);
  const colors = ["#f2ad43", "#e77474", "#8f7add", "#54a3e6"];
  const total = categories.reduce((sum, [, value]) => sum + value, 0);
  let start = 0;
  const segments = categories.map(([id, value], index) => {
    const end = start + (total ? (value / total) * 100 : 0);
    const segment = `${colors[index]} ${start}% ${end}%`;
    start = end;
    return segment;
  });
  const style = segments.length ? `background:conic-gradient(${segments.join(",")})` : "background:#e8eff4";
  return `<div class="spending-summary">
    <div class="donut" style="${style}"><span class="${visibilityClass()}">${money(total)}</span></div>
    <div class="spending-key">${categories.length ? categories.map(([id, value], index) => `<div class="spending-key-row"><i class="category-dot" style="background:${colors[index]}"></i><span>${esc(categoryLabel(id))}</span><strong class="${visibilityClass()}">${money(value)}</strong></div>`).join("") : `<span class="subtext">${esc(t("noTransactions"))}</span>`}</div>
  </div>`;
}

function renderUpcomingItem(item) {
  const due = new Date(`${item.dueDate}T12:00:00`);
  return `<div class="upcoming-item">
    <span class="due-day">${new Intl.DateTimeFormat(getLocale(), { day: "numeric" }).format(due)}</span>
    <span class="upcoming-copy"><strong>${esc(item.description)}</strong><small>${esc(friendlyDayDifference(item.dueDate))} · ${esc(t(item.frequency || "monthly"))}</small></span>
    <span class="upcoming-amount ${visibilityClass()}">${money(item.amount)}</span>
  </div>`;
}

function renderEmptyMini(message, iconName) {
  return `<div class="empty-state"><div><span class="empty-icon">${icon(iconName)}</span><h3>${esc(message)}</h3></div></div>`;
}

function renderTransactionsPage() {
  const term = transactionSearch.trim().toLowerCase();
  const records = sortedTransactions().filter((tx) => {
    const matchesType = transactionFilter === "all" || tx.type === transactionFilter;
    const haystack = `${tx.description} ${categoryLabel(tx.category)} ${tx.note || ""}`.toLowerCase();
    return matchesType && (!term || haystack.includes(term));
  });
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("transactions"))}</h2><p>${esc(t("manageTransactions"))}</p></div>
      <button class="primary-button" type="button" data-action="add-transaction">${icon("plus")}<span>${esc(t("addTransaction"))}</span></button>
    </section>
    <section class="page-toolbar" aria-label="${esc(t("transactions"))}">
      <label class="search-field"><span data-icon="search"></span><span class="visually-hidden">${esc(t("searchTransactions"))}</span><input id="transactionSearch" type="search" value="${esc(transactionSearch)}" placeholder="${esc(t("searchTransactions"))}" autocomplete="off" /></label>
      <button class="filter-chip ${transactionFilter === "all" ? "active" : ""}" type="button" data-action="transaction-filter" data-filter="all">${esc(t("all"))}</button>
      <button class="filter-chip ${transactionFilter === "income" ? "active" : ""}" type="button" data-action="transaction-filter" data-filter="income">${esc(t("income"))}</button>
      <button class="filter-chip ${transactionFilter === "expense" ? "active" : ""}" type="button" data-action="transaction-filter" data-filter="expense">${esc(t("expense"))}</button>
      <span class="toolbar-spacer"></span>
      <button class="secondary-button" type="button" data-action="export-csv">${icon("download")}<span>${esc(t("downloadCsv"))}</span></button>
    </section>
    <section class="data-table-wrap">
      ${records.length ? `<table class="data-table"><thead><tr><th>${esc(t("description"))}</th><th>${esc(t("category"))}</th><th>${esc(t("account"))}</th><th>${esc(t("date"))}</th><th>${esc(t("type"))}</th><th>${esc(t("amount"))}</th><th><span class="visually-hidden">${esc(t("actions"))}</span></th></tr></thead><tbody>${records.map(renderTransactionTableRow).join("")}</tbody></table>` : renderFullEmpty(t("noTransactions"), t("noTransactionsDetail"), "receipt", "add-transaction", t("addTransaction"))}
    </section>`;
}

function renderTransactionTableRow(tx) {
  const account = state.accounts.find((item) => item.id === tx.accountId);
  const typeClass = tx.type === "income" ? "income" : "expense";
  return `<tr>
    <td><span class="table-title"><span class="table-icon ${tx.type === "expense" ? "expense" : ""}">${transactionIcon(tx)}</span><span>${esc(tx.description)}${tx.note ? `<small class="subtext">${esc(tx.note)}</small>` : ""}</span></span></td>
    <td>${esc(categoryLabel(tx.category))}</td>
    <td>${esc(accountLabel(account))}</td>
    <td>${esc(dateLabel(tx.date, { day: "numeric", month: "short", year: "numeric" }))}</td>
    <td><span class="pill ${typeClass}">${esc(tx.type === "income" ? t("income") : t("expense"))}${tx.recurring ? ` · ${esc(t("recurring"))}` : ""}</span></td>
    <td class="table-amount ${typeClass} ${visibilityClass()}">${money(tx.type === "income" ? tx.amount : -tx.amount, true)}</td>
    <td><span class="row-actions"><button class="row-action" type="button" data-action="edit-transaction" data-id="${esc(tx.id)}" aria-label="${esc(t("edit"))}">${icon("edit")}</button><button class="row-action delete" type="button" data-action="delete-transaction" data-id="${esc(tx.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></span></td>
  </tr>`;
}

function renderBudgetsPage() {
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("budgets"))}</h2><p>${esc(t("manageBudgets"))}</p></div>
      <button class="primary-button" type="button" data-action="add-budget">${icon("plus")}<span>${esc(t("addBudget"))}</span></button>
    </section>
    ${state.budgets.length ? `<section class="budget-grid">${state.budgets.map(renderBudgetCard).join("")}</section>` : `<section class="panel">${renderFullEmpty(t("noBudgets"), t("noBudgetsDetail"), "budget", "add-budget", t("addBudget"))}</section>`}
  `;
}

function renderBudgetCard(budget) {
  const spend = budgetSpend(budget.category);
  const progress = percentage(spend, budget.limit);
  const status = progress > 100 ? "over" : progress > 78 ? "warn" : "";
  const meta = CATEGORY_META[budget.category] || CATEGORY_META.otherExpense;
  return `<article class="budget-card">
    <div class="budget-card-top"><span class="category-icon ${esc(meta.color || "green")}">${icon(meta.icon)}</span><button class="more-button" type="button" data-action="delete-budget" data-id="${esc(budget.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></div>
    <h3>${esc(categoryLabel(budget.category))}</h3><p>${esc(monthLabel())}</p>
    <div class="budget-amount-row"><span class="${visibilityClass()}">${money(spend)}</span><small class="${visibilityClass()}">${money(budget.limit)}</small></div>
    <div class="progress-track"><div class="progress-bar ${status}" style="width:${progress}%"></div></div>
    <div class="budget-card-foot"><span>${progress}% ${esc(t("spent"))}</span><span class="${visibilityClass()}">${money(Math.max(budget.limit - spend, 0))} ${esc(t("remaining"))}</span></div>
  </article>`;
}

function renderGoalsPage() {
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("goals"))}</h2><p>${esc(t("manageGoals"))}</p></div>
      <button class="primary-button" type="button" data-action="add-goal">${icon("plus")}<span>${esc(t("addGoal"))}</span></button>
    </section>
    ${state.goals.length ? `<section class="goal-grid">${state.goals.map(renderGoalCard).join("")}</section>` : `<section class="panel">${renderFullEmpty(t("noGoals"), t("noGoalsDetail"), "target", "add-goal", t("addGoal"))}</section>`}
  `;
}

function renderGoalCard(goal) {
  const progress = percentage(goal.saved, goal.target);
  return `<article class="goal-card">
    <div class="goal-card-top"><span class="goal-icon ${esc(goal.color || "green")}">${icon(goal.icon || "target")}</span><button class="more-button" type="button" data-action="delete-goal" data-id="${esc(goal.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></div>
    <h3>${esc(goal.name)}</h3><p class="goal-date">${icon("calendar")}<span>${esc(t("due"))} ${esc(dateLabel(goal.dueDate, { month: "short", year: "numeric" }))}</span></p>
    <div class="goal-bottom"><div class="goal-amount-row"><span class="${visibilityClass()}">${money(goal.saved)}</span><small class="${visibilityClass()}">${money(goal.target)}</small></div><div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div><div class="goal-card-foot"><span>${progress}% ${esc(t("contributed"))}</span><button class="quiet-button" type="button" data-action="contribute-goal" data-id="${esc(goal.id)}">${icon("plus")}${esc(t("contribute"))}</button></div></div>
  </article>`;
}

function renderAccountsPage() {
  const available = state.accounts.length ? state.accounts : [];
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("accounts"))}</h2><p>${esc(t("manageAccounts"))}</p></div>
      <button class="primary-button" type="button" data-action="add-account">${icon("plus")}<span>${esc(t("addAccount"))}</span></button>
    </section>
    ${available.length ? `<section class="account-grid">${available.map(renderAccountCard).join("")}</section>` : `<section class="panel">${renderFullEmpty(t("noAccounts"), t("noAccountsDetail"), "wallet", "add-account", t("addAccount"))}</section>`}
    ${available.length ? `<section class="panel" style="margin-top:1rem"><div class="panel-heading"><div><h3>${esc(t("currentBalanceLabel"))}</h3><p>${esc(t("availableAcross"))}</p></div><strong class="metric-amount ${visibilityClass()}" style="font-size:1.3rem">${money(totalBalance())}</strong></div></section>` : ""}
  `;
}

function renderAccountCard(account, index) {
  const meta = ACCOUNT_META[account.type] || ACCOUNT_META.bank;
  const isPrimary = index === 0;
  const balance = accountBalance(account.id);
  return `<article class="account-card ${isPrimary ? "primary-account" : ""}">
    <div class="account-card-top"><span class="account-icon">${icon(meta.icon)}</span><button class="more-button" type="button" data-action="delete-account" data-id="${esc(account.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></div>
    <h3>${esc(account.name)}</h3><p>${esc(accountTypeLabel(account.type))}</p><div class="account-balance ${visibilityClass()}">${money(balance)}</div><div class="account-number">${icon("wallet")}<span>${esc(t("available"))}</span></div>
  </article>`;
}

function renderReportsPage() {
  const income = monthIncome();
  const expense = monthExpense();
  const saved = monthSaved();
  const budgetsTotal = state.budgets.reduce((sum, budget) => sum + Number(budget.limit), 0);
  const usedBudgets = state.budgets.reduce((sum, budget) => sum + budgetSpend(budget.category), 0);
  const categories = spentByCategory().slice(0, 5);
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("reports"))}</h2><p>${esc(t("manageReports"))}</p></div>
      <button class="secondary-button" type="button" data-action="export-csv">${icon("download")}<span>${esc(t("downloadCsv"))}</span></button>
    </section>
    <section class="reports-grid">
      <div class="stack">
        <article class="report-highlight"><p>${esc(t("monthlySnapshot"))} · ${esc(monthLabel())}</p><h3>${esc(t("healthyPace"))}</h3><div class="highlight-row"><span class="highlight-stat"><strong class="${visibilityClass()}">${money(saved)}</strong><span>${esc(t("savedThisMonth"))}</span></span><span class="highlight-stat"><strong>${income ? Math.max(0, Math.round((saved / income) * 100)) : 0}%</strong><span>${esc(t("ofIncomeSaved"))}</span></span><span class="highlight-stat"><strong>${budgetsTotal ? Math.min(100, Math.round((usedBudgets / budgetsTotal) * 100)) : 0}%</strong><span>${esc(t("plannedBudget"))}</span></span></div></article>
        ${renderCashFlowPanel()}
      </div>
      <div class="stack">
        <article class="panel"><div class="panel-heading"><div><h3>${esc(t("incomeVsExpenses"))}</h3><p>${esc(t("thisMonth"))}</p></div></div><div class="report-list"><div class="report-list-item"><span class="report-list-icon">${icon("arrowUp")}</span><span class="report-list-copy"><strong>${esc(t("income"))}</strong><small>${esc(monthLabel())}</small></span><strong class="positive ${visibilityClass()}">${money(income)}</strong></div><div class="report-list-item"><span class="report-list-icon" style="color:#c95454;background:#ffeded">${icon("arrowDown")}</span><span class="report-list-copy"><strong>${esc(t("expense"))}</strong><small>${esc(monthLabel())}</small></span><strong class="negative ${visibilityClass()}">${money(expense)}</strong></div><div class="report-list-item"><span class="report-list-icon" style="color:#986317;background:#fff5df">${icon("target")}</span><span class="report-list-copy"><strong>${esc(t("savedThisMonth"))}</strong><small>${esc(t("incomeVsExpenses"))}</small></span><strong class="${saved >= 0 ? "positive" : "negative"} ${visibilityClass()}">${money(saved)}</strong></div></div></article>
        <article class="panel"><div class="panel-heading"><div><h3>${esc(t("topCategories"))}</h3><p>${esc(t("categoryBreakdown"))}</p></div></div><div class="report-list">${categories.length ? categories.map(([category, value]) => `<div class="report-list-item"><span class="report-list-icon" style="color:${categoryColor(category)};background:${categoryPale(category)}">${icon(CATEGORY_META[category]?.icon || "receipt")}</span><span class="report-list-copy"><strong>${esc(categoryLabel(category))}</strong><small>${Math.round((value / Math.max(expense, 1)) * 100)}% ${esc(t("of"))} ${esc(t("expenseThisMonth")).toLowerCase()}</small></span><strong class="${visibilityClass()}">${money(value)}</strong></div>`).join("") : renderEmptyMini(t("noTransactions"), "chart")}</div></article>
      </div>
    </section>`;
}

function categoryColor(id) {
  const map = { coral: "#cf5950", blue: "#3c83db", gold: "#9e6716", purple: "#7658ce", green: "#08765b" };
  return map[CATEGORY_META[id]?.color] || map.gold;
}

function categoryPale(id) {
  const map = { coral: "#ffeded", blue: "#eaf3ff", gold: "#fff5df", purple: "#f1edff", green: "#e7f8f2" };
  return map[CATEGORY_META[id]?.color] || map.gold;
}

function renderVaultPage() {
  return `
    <section class="page-heading-row">
      <div><h2>${esc(t("vault"))}</h2><p>${esc(t("manageVault"))}</p></div>
      <button class="primary-button" type="button" data-action="add-record">${icon("plus")}<span>${esc(t("addRecord"))}</span></button>
    </section>
    ${state.vaultNotes.length ? `<section class="vault-grid">${state.vaultNotes.map(renderVaultCard).join("")}</section>` : `<section class="panel">${renderFullEmpty(t("noRecords"), t("noRecordsDetail"), "vault", "add-record", t("addRecord"))}</section>`}
  `;
}

function renderVaultCard(note) {
  const meta = NOTE_TYPES[note.type] || NOTE_TYPES.other;
  return `<article class="vault-card">
    <div class="vault-card-top"><span class="vault-icon ${esc(meta.color)}">${icon(meta.icon)}</span><button class="more-button" type="button" data-action="delete-record" data-id="${esc(note.id)}" aria-label="${esc(t("delete"))}">${icon("trash")}</button></div>
    <h3>${esc(note.title)}</h3><p>${esc(note.value)}${note.notes ? ` · ${esc(note.notes)}` : ""}</p><div class="vault-card-bottom"><span class="vault-type">${esc(noteTypeLabel(note.type))}</span><span>${esc(t("updated"))} ${esc(dateLabel(note.updatedAt))}</span></div>
  </article>`;
}

function renderSettingsPage() {
  return `
    <section class="page-heading-row"><div><h2>${esc(t("settings"))}</h2><p>${esc(t("manageSettings"))}</p></div></section>
    <section class="settings-grid">
      <article class="panel"><div class="panel-heading"><div><h3>${esc(t("appearance"))}</h3><p>${esc(t("personalWorkspace"))}</p></div></div><div class="settings-list">
        <div class="setting-row"><span class="setting-icon lock">${icon("eye")}</span><span class="setting-copy"><strong>${esc(t("privacyBlur"))}</strong><small>${esc(t("privacyBlurDetail"))}</small></span><button class="switch ${state.privacyMode ? "on" : ""}" type="button" data-action="toggle-privacy" role="switch" aria-checked="${state.privacyMode}"></button></div>
        <div class="setting-row"><span class="setting-icon">${icon("globe")}</span><span class="setting-copy"><strong>${esc(t("language"))}</strong><small>${esc(t("languageDetail"))}</small></span><select class="select-control" data-setting="language" aria-label="${esc(t("language"))}"><option value="en" ${state.language === "en" ? "selected" : ""}>English</option><option value="ar" ${state.language === "ar" ? "selected" : ""}>العربية</option></select></div>
        <div class="setting-row"><span class="setting-icon file">${icon("wallet")}</span><span class="setting-copy"><strong>${esc(t("currency"))}</strong><small>${esc(t("currencyDetail"))}</small></span><select class="select-control" data-setting="currency" aria-label="${esc(t("currency"))}">${["JOD", "USD", "EUR", "GBP", "AED", "SAR"].map((cur) => `<option value="${cur}" ${state.currency === cur ? "selected" : ""}>${cur}</option>`).join("")}</select></div>
        <div class="setting-row"><span class="setting-icon">${icon("bell")}</span><span class="setting-copy"><strong>${esc(t("reminders"))}</strong><small>${esc(t("remindersDetail"))}</small></span><button class="switch ${state.preferences.monthlyReminder ? "on" : ""}" type="button" data-action="toggle-reminder" role="switch" aria-checked="${state.preferences.monthlyReminder}"></button></div>
        <div class="setting-row"><span class="setting-icon file">${icon("download")}</span><span class="setting-copy"><strong>${esc(t("dataBackup"))}</strong><small>${esc(t("dataBackupDetail"))}</small></span><button class="secondary-button" type="button" data-action="open-backup">${esc(t("exportBackup"))}</button></div>
      </div><div class="settings-note">${icon("info")} ${esc(t("deviceOnlyDetail"))}</div></article>
      <aside class="security-card"><div class="security-head"><span class="security-emblem">${icon("shield")}</span><div><h3>${esc(t("deviceOnly"))}</h3><p>${esc(t("dataBackupDetail"))}</p></div></div><ul><li>${icon("check")}<span>${esc(t("privateOnDevice"))}</span></li><li>${icon("check")}<span>${esc(t("exportBackup"))}</span></li><li>${icon("check")}<span>${esc(t("exportCsv"))}</span></li></ul><button class="secondary-button" type="button" data-action="open-backup">${icon("shield")}<span>${esc(t("viewSettings"))}</span></button></aside>
    </section>`;
}

function renderFullEmpty(title, detail, iconName, action, actionText) {
  return `<div class="empty-state"><div><span class="empty-icon">${icon(iconName)}</span><h3>${esc(title)}</h3><p>${esc(detail)}</p><button class="primary-button" type="button" data-action="${esc(action)}">${icon("plus")}<span>${esc(actionText)}</span></button></div></div>`;
}

function renderContent() {
  const views = {
    dashboard: renderDashboard,
    transactions: renderTransactionsPage,
    budgets: renderBudgetsPage,
    goals: renderGoalsPage,
    accounts: renderAccountsPage,
    reports: renderReportsPage,
    vault: renderVaultPage,
    settings: renderSettingsPage
  };
  document.getElementById("appContent").innerHTML = (views[currentPage] || renderDashboard)();
}

function categoryOptions(type, selected) {
  return Object.entries(CATEGORY_META)
    .filter(([, meta]) => meta.type === type)
    .map(([id, meta]) => `<option value="${id}" ${id === selected ? "selected" : ""}>${esc(langValue(meta))}</option>`)
    .join("");
}

function accountOptions(selected) {
  return state.accounts.map((account) => `<option value="${esc(account.id)}" ${account.id === selected ? "selected" : ""}>${esc(account.name)} · ${esc(accountTypeLabel(account.type))}</option>`).join("");
}

function openModal(content, size = "") {
  const layer = document.getElementById("modalLayer");
  layer.innerHTML = `<div class="modal-backdrop" data-action="close-modal"></div><section class="modal ${size}" role="dialog" aria-modal="true">${content}</section>`;
  layer.classList.add("open");
  renderIcons(layer);
  setTimeout(() => layer.querySelector("[autofocus], input, button")?.focus(), 0);
}

function closeModal() {
  const layer = document.getElementById("modalLayer");
  layer.classList.remove("open");
  layer.innerHTML = "";
}

function modalHeader(title, detail) {
  return `<header class="modal-header"><div><h2>${esc(title)}</h2>${detail ? `<p>${esc(detail)}</p>` : ""}</div><button class="close-button" type="button" data-action="close-modal" aria-label="${esc(t("close"))}">${icon("close")}</button></header>`;
}

function openTransactionModal(defaultType = "expense", record = null) {
  if (!state.accounts.length) {
    showToast(t("noAccounts"), t("noAccountsDetail"), "error");
    return;
  }
  const type = record?.type || defaultType;
  const category = record?.category || (type === "income" ? "salary" : "food");
  const content = `${modalHeader(record ? t("editTransactionTitle") : t("addTransactionTitle"), record ? t("editTransactionDetail") : t("addTransactionDetail"))}
    <form data-form="transaction" data-record-id="${esc(record?.id || "")}">
      <div class="modal-body">
        <div class="field"><label>${esc(t("transactionType"))}</label><div class="segmented" data-transaction-type-chooser><button type="button" class="${type === "expense" ? "active" : ""}" data-action="select-transaction-type" data-type="expense">${icon("arrowDown")} ${esc(t("expenseType"))}</button><button type="button" class="${type === "income" ? "active" : ""}" data-action="select-transaction-type" data-type="income">${icon("arrowUp")} ${esc(t("incomeType"))}</button></div><input type="hidden" name="type" value="${type}" /></div>
        <div class="form-grid" style="margin-top:.92rem">
          <div class="field full"><label for="transaction-description">${esc(t("description"))}</label><input class="input-control" id="transaction-description" name="description" required maxlength="80" value="${esc(record?.description || "")}" placeholder="${esc(t("description"))}" autofocus /></div>
          <div class="field"><label for="transaction-amount">${esc(t("amount"))}</label><input class="input-control" id="transaction-amount" name="amount" required min="0.01" max="999999999" step="0.01" type="number" inputmode="decimal" value="${record ? esc(record.amount) : ""}" placeholder="0.00" /></div>
          <div class="field"><label for="transaction-date">${esc(t("date"))}</label><input class="input-control" id="transaction-date" name="date" required type="date" value="${esc(record?.date || isoDate())}" /></div>
          <div class="field"><label for="transaction-category">${esc(t("category"))}</label><select class="select-control" id="transaction-category" name="category">${categoryOptions(type, category)}</select></div>
          <div class="field"><label for="transaction-account">${esc(t("account"))}</label><select class="select-control" id="transaction-account" name="accountId">${accountOptions(record?.accountId || state.accounts[0].id)}</select></div>
          <div class="field full"><label for="transaction-note">${esc(t("note"))} <span class="subtext" style="display:inline">(${esc(t("optional"))})</span></label><textarea class="textarea-control" id="transaction-note" name="note" maxlength="300" placeholder="${esc(t("note"))}">${esc(record?.note || "")}</textarea></div>
          <div class="field full"><label style="display:flex;align-items:center;gap:.5rem"><input name="recurring" type="checkbox" ${record?.recurring ? "checked" : ""} /> ${esc(t("recurring"))}</label><p class="field-help">${esc(t("recurringHint"))}</p></div>
          <div class="field"><label for="transaction-frequency">${esc(t("frequency"))}</label><select class="select-control" id="transaction-frequency" name="frequency"><option value="monthly" ${(record?.frequency || "monthly") === "monthly" ? "selected" : ""}>${esc(t("monthly"))}</option><option value="weekly" ${record?.frequency === "weekly" ? "selected" : ""}>${esc(t("weekly"))}</option><option value="yearly" ${record?.frequency === "yearly" ? "selected" : ""}>${esc(t("yearly"))}</option></select></div>
        </div><div class="form-note">${icon("info")}<span>${esc(t("deviceOnlyDetail"))}</span></div>
      </div>
      <footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(record ? t("updateTransaction") : t("saveTransaction"))}</span></button></footer>
    </form>`;
  openModal(content);
}

function openBudgetModal() {
  const content = `${modalHeader(t("addBudgetTitle"), t("addBudgetDetail"))}<form data-form="budget"><div class="modal-body"><div class="form-grid one"><div class="field"><label for="budget-category">${esc(t("budgetName"))}</label><select class="select-control" id="budget-category" name="category">${categoryOptions("expense", "food")}</select></div><div class="field"><label for="budget-limit">${esc(t("monthlyLimit"))}</label><input class="input-control" id="budget-limit" name="limit" required min="0.01" step="0.01" type="number" inputmode="decimal" placeholder="0.00" autofocus /></div></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(t("saveBudget"))}</span></button></footer></form>`;
  openModal(content, "small");
}

function openGoalModal() {
  const targetDefault = new Date();
  targetDefault.setFullYear(targetDefault.getFullYear() + 1);
  const content = `${modalHeader(t("addGoalTitle"), t("addGoalDetail"))}<form data-form="goal"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="goal-name">${esc(t("goalName"))}</label><input class="input-control" id="goal-name" name="name" required maxlength="70" placeholder="${esc(t("goalName"))}" autofocus /></div><div class="field"><label for="goal-target">${esc(t("targetAmount"))}</label><input class="input-control" id="goal-target" name="target" required min="0.01" step="0.01" type="number" inputmode="decimal" placeholder="0.00" /></div><div class="field"><label for="goal-saved">${esc(t("savedAlready"))}</label><input class="input-control" id="goal-saved" name="saved" min="0" step="0.01" type="number" inputmode="decimal" value="0" /></div><div class="field full"><label for="goal-date">${esc(t("targetDate"))}</label><input class="input-control" id="goal-date" name="dueDate" required type="date" value="${targetDefault.toISOString().slice(0, 10)}" /></div></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(t("saveGoal"))}</span></button></footer></form>`;
  openModal(content, "small");
}

function openGoalContributionModal(goal) {
  if (!goal) return;
  const content = `${modalHeader(t("contributeTitle"), t("contributeDetail"))}<form data-form="contribution" data-goal-id="${esc(goal.id)}"><div class="modal-body"><div class="form-grid one"><div class="field"><label>${esc(goal.name)}</label><p class="field-help">${esc(t("contributed"))}: ${money(goal.saved)} · ${esc(t("target"))}: ${money(goal.target)}</p></div><div class="field"><label for="contribution-amount">${esc(t("contributionAmount"))}</label><input class="input-control" id="contribution-amount" name="amount" required min="0.01" step="0.01" type="number" inputmode="decimal" placeholder="0.00" autofocus /></div></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(t("saveContribution"))}</span></button></footer></form>`;
  openModal(content, "small");
}

function openAccountModal() {
  const content = `${modalHeader(t("addAccountTitle"), t("addAccountDetail"))}<form data-form="account"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="account-name">${esc(t("accountName"))}</label><input class="input-control" id="account-name" name="name" required maxlength="70" placeholder="${esc(t("accountName"))}" autofocus /></div><div class="field"><label for="account-type">${esc(t("accountType"))}</label><select class="select-control" id="account-type" name="type"><option value="cash">${esc(t("cashAccount"))}</option><option value="bank">${esc(t("bankAccount"))}</option><option value="card">${esc(t("cardAccount"))}</option><option value="savings">${esc(t("savingsAccount"))}</option></select></div><div class="field"><label for="account-opening">${esc(t("openingBalance"))}</label><input class="input-control" id="account-opening" name="openingBalance" required step="0.01" type="number" inputmode="decimal" value="0" /></div></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(t("saveAccount"))}</span></button></footer></form>`;
  openModal(content, "small");
}

function openRecordModal() {
  const content = `${modalHeader(t("addRecordTitle"), t("addRecordDetail"))}<form data-form="record"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="record-title">${esc(t("recordTitle"))}</label><input class="input-control" id="record-title" name="title" required maxlength="90" placeholder="${esc(t("recordTitle"))}" autofocus /></div><div class="field"><label for="record-type">${esc(t("recordType"))}</label><select class="select-control" id="record-type" name="type">${Object.keys(NOTE_TYPES).map((type) => `<option value="${type}">${esc(noteTypeLabel(type))}</option>`).join("")}</select></div><div class="field"><label for="record-value">${esc(t("recordValue"))}</label><input class="input-control" id="record-value" name="value" required maxlength="110" placeholder="${esc(t("recordValue"))}" /></div><div class="field full"><label for="record-notes">${esc(t("recordNotes"))}</label><textarea class="textarea-control" id="record-notes" name="notes" maxlength="500" placeholder="${esc(t("recordNotes"))}"></textarea></div></div><div class="form-note">${icon("shield")}<span>${esc(t("deviceOnlyDetail"))}</span></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="primary-button" type="submit">${icon("check")}<span>${esc(t("saveRecord"))}</span></button></footer></form>`;
  openModal(content);
}

function openBackupModal() {
  const content = `${modalHeader(t("backupTitle"), t("backupDetail"))}<div class="modal-body"><div class="backup-options"><button class="backup-option" type="button" data-action="export-json"><span class="backup-option-icon">${icon("download")}</span><span><strong>${esc(t("downloadBackup"))}</strong><small>${esc(t("downloadBackupDetail"))}</small></span><span class="option-arrow">${icon("chevron")}</span></button><button class="backup-option" type="button" data-action="trigger-import"><span class="backup-option-icon">${icon("upload")}</span><span><strong>${esc(t("importBackup"))}</strong><small>${esc(t("importBackupDetail"))}</small></span><span class="option-arrow">${icon("chevron")}</span></button><input id="backupImport" class="visually-hidden" type="file" accept="application/json,.json" /><button class="backup-option" type="button" data-action="export-csv"><span class="backup-option-icon">${icon("file")}</span><span><strong>${esc(t("downloadTransactions"))}</strong><small>${esc(t("downloadTransactionsDetail"))}</small></span><span class="option-arrow">${icon("chevron")}</span></button></div></div><footer class="modal-footer"><button class="secondary-button" type="button" data-action="close-modal">${esc(t("close"))}</button></footer>`;
  openModal(content, "small");
}

function openMobileNavigation() {
  const items = NAV_ITEMS.map(([page, iconName]) => navButton(page, iconName)).join("");
  const content = `${modalHeader(t("appName"), t("personalWorkspace"))}<div class="modal-body"><nav class="side-nav" style="gap:.38rem">${items}</nav></div>`;
  openModal(content, "small");
}

function showToast(title, detail = "", tone = "success") {
  const region = document.getElementById("toastRegion");
  const toast = document.createElement("div");
  toast.className = `toast ${tone === "error" ? "error" : ""}`;
  toast.innerHTML = `<span class="toast-icon">${icon(tone === "error" ? "info" : "check")}</span><span><strong>${esc(title)}</strong>${detail ? `<span>${esc(detail)}</span>` : ""}</span>`;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3900);
}

function downloadFile(filename, contents, mime) {
  const url = URL.createObjectURL(new Blob([contents], { type: mime }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportJson() {
  const payload = { app: "Namaa Finance", version: APP_VERSION, exportedAt: new Date().toISOString(), data: state };
  downloadFile(`namaa-finance-backup-${isoDate()}.json`, JSON.stringify(payload, null, 2), "application/json");
  showToast(t("backupDownloaded"), t("privateOnDevice"));
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportCsv() {
  const rows = [["Date", "Description", "Type", "Category", "Account", "Amount", "Currency", "Recurring", "Note"]];
  sortedTransactions().forEach((tx) => {
    rows.push([tx.date, tx.description, tx.type, categoryLabel(tx.category), accountLabel(state.accounts.find((account) => account.id === tx.accountId)), tx.amount, state.currency, tx.recurring ? "Yes" : "No", tx.note || ""]);
  });
  const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
  downloadFile(`namaa-finance-transactions-${isoDate()}.csv`, csv, "text/csv;charset=utf-8");
  showToast(t("csvDownloaded"), t("transactions"));
}

function restoreFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || ""));
      const imported = payload?.data || payload;
      if (!imported || typeof imported !== "object" || !Array.isArray(imported.transactions) || !Array.isArray(imported.accounts)) throw new Error("invalid");
      if (!window.confirm(t("confirmRestore"))) return;
      state = {
        ...createDefaultState(),
        ...imported,
        profile: { ...createDefaultState().profile, ...(imported.profile || {}) },
        preferences: { ...createDefaultState().preferences, ...(imported.preferences || {}) },
        accounts: imported.accounts,
        transactions: imported.transactions,
        budgets: Array.isArray(imported.budgets) ? imported.budgets : [],
        goals: Array.isArray(imported.goals) ? imported.goals : [],
        vaultNotes: Array.isArray(imported.vaultNotes) ? imported.vaultNotes : []
      };
      saveState();
      currentPage = "dashboard";
      closeModal();
      renderApp();
      showToast(t("backupRestored"), t("privateOnDevice"));
    } catch {
      showToast(t("invalidBackup"), "", "error");
    }
  };
  reader.readAsText(file);
}

function setTransactionType(type) {
  const form = document.querySelector('form[data-form="transaction"]');
  if (!form) return;
  form.querySelector('input[name="type"]').value = type;
  form.querySelectorAll("[data-action='select-transaction-type']").forEach((button) => button.classList.toggle("active", button.dataset.type === type));
  const select = form.querySelector('select[name="category"]');
  select.innerHTML = categoryOptions(type, type === "income" ? "salary" : "food");
}

function submitTransaction(form) {
  const formData = new FormData(form);
  const amount = Number(formData.get("amount"));
  if (!Number.isFinite(amount) || amount <= 0) return showToast(t("addTransactionTitle"), t("invalidAmount"), "error");
  const recordId = form.dataset.recordId;
  const record = {
    id: recordId || uid("tx"),
    description: String(formData.get("description") || "").trim(),
    amount,
    type: String(formData.get("type")),
    category: String(formData.get("category")),
    accountId: String(formData.get("accountId")),
    date: String(formData.get("date")),
    note: String(formData.get("note") || "").trim(),
    recurring: formData.has("recurring"),
    frequency: String(formData.get("frequency") || "monthly")
  };
  if (!record.description || !record.date || !record.accountId) return showToast(t("addTransactionTitle"), t("completeRequired"), "error");
  if (recordId) {
    state.transactions = state.transactions.map((tx) => tx.id === recordId ? record : tx);
    showToast(t("recordUpdated"), record.description);
  } else {
    state.transactions.push(record);
    showToast(t("recordAdded"), record.description);
  }
  saveState();
  closeModal();
  renderApp();
}

function submitBudget(form) {
  const data = new FormData(form);
  const limit = Number(data.get("limit"));
  if (!Number.isFinite(limit) || limit <= 0) return showToast(t("addBudgetTitle"), t("validMonthlyLimit"), "error");
  state.budgets.push({ id: uid("budget"), category: String(data.get("category")), limit });
  saveState(); closeModal(); renderApp(); showToast(t("budgetAdded"));
}

function submitGoal(form) {
  const data = new FormData(form);
  const target = Number(data.get("target"));
  const saved = Number(data.get("saved"));
  const name = String(data.get("name") || "").trim();
  if (!name || !Number.isFinite(target) || target <= 0 || !Number.isFinite(saved) || saved < 0) return showToast(t("addGoalTitle"), t("completeGoal"), "error");
  state.goals.push({ id: uid("goal"), name, target, saved, dueDate: String(data.get("dueDate")), icon: "target", color: "gold" });
  saveState(); closeModal(); renderApp(); showToast(t("goalAdded"), name);
}

function submitContribution(form) {
  const data = new FormData(form);
  const amount = Number(data.get("amount"));
  const id = form.dataset.goalId;
  if (!Number.isFinite(amount) || amount <= 0) return showToast(t("contributeTitle"), t("invalidAmount"), "error");
  state.goals = state.goals.map((goal) => goal.id === id ? { ...goal, saved: Number(goal.saved) + amount } : goal);
  saveState(); closeModal(); renderApp(); showToast(t("contributionAdded"));
}

function submitAccount(form) {
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const openingBalance = Number(data.get("openingBalance"));
  if (!name || !Number.isFinite(openingBalance)) return showToast(t("addAccountTitle"), t("completeAccount"), "error");
  state.accounts.push({ id: uid("account"), name, type: String(data.get("type")), openingBalance });
  saveState(); closeModal(); renderApp(); showToast(t("accountAdded"), name);
}

function submitRecord(form) {
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const value = String(data.get("value") || "").trim();
  if (!title || !value) return showToast(t("addRecordTitle"), t("completeRequired"), "error");
  state.vaultNotes.unshift({ id: uid("vault"), title, type: String(data.get("type")), value, notes: String(data.get("notes") || "").trim(), updatedAt: isoDate() });
  saveState(); closeModal(); renderApp(); showToast(t("recordAdded"), title);
}

function navigate(page) {
  if (!NAV_ITEMS.some(([id]) => id === page)) return;
  currentPage = page;
  transactionSearch = "";
  transactionFilter = "all";
  closeModal();
  renderApp();
  document.getElementById("appContent")?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderApp() {
  applyLanguage();
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  renderNavigation();
  renderHeader();
  renderContent();
  renderIcons();
}

function deleteTransaction(id) {
  const tx = state.transactions.find((item) => item.id === id);
  if (!tx || !window.confirm(t("confirmDelete"))) return;
  state.transactions = state.transactions.filter((item) => item.id !== id);
  saveState(); renderApp(); showToast(t("recordDeleted"), tx.description);
}

function deleteBudget(id) {
  if (!window.confirm(t("confirmDelete"))) return;
  state.budgets = state.budgets.filter((item) => item.id !== id);
  saveState(); renderApp(); showToast(t("budgetDeleted"));
}

function deleteGoal(id) {
  if (!window.confirm(t("confirmDelete"))) return;
  state.goals = state.goals.filter((item) => item.id !== id);
  saveState(); renderApp(); showToast(t("goalDeleted"));
}

function deleteAccount(id) {
  const account = state.accounts.find((item) => item.id === id);
  if (!account) return;
  if (state.transactions.some((tx) => tx.accountId === id)) {
    showToast(t("accountInUse"), account.name, "error");
    return;
  }
  if (!window.confirm(t("confirmDelete"))) return;
  state.accounts = state.accounts.filter((item) => item.id !== id);
  saveState(); renderApp(); showToast(t("accountDeleted"), account.name);
}

function deleteRecord(id) {
  if (!window.confirm(t("confirmDelete"))) return;
  state.vaultNotes = state.vaultNotes.filter((item) => item.id !== id);
  saveState(); renderApp(); showToast(t("recordDeleted"));
}

function maybeShowMonthlyReview() {
  if (!state.preferences.monthlyReminder) return;
  const key = new Date().toISOString().slice(0, 7);
  if (state.preferences.lastReviewPrompt === key) return;
  state.preferences.lastReviewPrompt = key;
  saveState();
  setTimeout(() => showToast(t("monthlySnapshot"), t("clearView")), 700);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}), { once: true });
  }
}

function validateWebTransaction(input) {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const type = input.type === "income" ? "income" : input.type === "expense" ? "expense" : null;
  const amount = Number(input.amount);
  if (!type || !Number.isFinite(amount) || amount <= 0) throw new Error("A positive amount and transaction type are required.");
  const fallbackCategory = type === "income" ? "otherIncome" : "otherExpense";
  const category = CATEGORY_META[input.category]?.type === type ? input.category : fallbackCategory;
  const accountId = state.accounts.some((account) => account.id === input.accountId) ? input.accountId : state.accounts[0]?.id;
  if (!accountId) throw new Error("Create an account before adding a transaction.");
  return {
    id: uid("tx"),
    description: String(input.description || (type === "income" ? t("income") : t("expense"))).slice(0, 80),
    amount,
    type,
    category,
    accountId,
    date: /^\d{4}-\d{2}-\d{2}$/.test(String(input.date || "")) ? String(input.date) : isoDate(),
    note: String(input.note || "").slice(0, 300),
    recurring: Boolean(input.recurring),
    frequency: ["weekly", "monthly", "yearly"].includes(input.frequency) ? input.frequency : "monthly"
  };
}

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const controller = new AbortController();
  try {
    void Promise.resolve(context.registerTool({
      name: "get_finance_summary",
      title: "Get financial summary",
      description: "Read the current on-device summary: total balance, current-month income, expenses, and savings.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return { currency: state.currency, totalBalance: totalBalance(), monthIncome: monthIncome(), monthExpenses: monthExpense(), monthSaved: monthSaved() };
      }
    }, { signal: controller.signal })).catch(() => {});
    void Promise.resolve(context.registerTool({
      name: "add_financial_transaction",
      title: "Add financial transaction",
      description: "Create an income or expense transaction in the visible personal finance workspace.",
      inputSchema: {
        type: "object",
        properties: {
          description: { type: "string" }, amount: { type: "number", exclusiveMinimum: 0 }, type: { type: "string", enum: ["income", "expense"] },
          category: { type: "string" }, accountId: { type: "string" }, date: { type: "string" }, note: { type: "string" }, recurring: { type: "boolean" }, frequency: { type: "string", enum: ["weekly", "monthly", "yearly"] }
        },
        required: ["amount", "type"], additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const tx = validateWebTransaction(input);
        state.transactions.push(tx);
        saveState();
        renderApp();
        return { id: tx.id, description: tx.description, totalBalance: totalBalance(), currency: state.currency };
      }
    }, { signal: controller.signal })).catch(() => {});
  } catch {
    // WebMCP is optional; the visible app remains fully usable without it.
  }
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const pageButton = target.closest("[data-page]");
  if (pageButton) {
    navigate(pageButton.dataset.page);
    return;
  }
  const actionButton = target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  const id = actionButton.dataset.id;
  switch (action) {
    case "close-modal": closeModal(); break;
    case "add-transaction": openTransactionModal(); break;
    case "quick-expense": openTransactionModal("expense"); break;
    case "quick-income": openTransactionModal("income"); break;
    case "edit-transaction": openTransactionModal("expense", state.transactions.find((tx) => tx.id === id)); break;
    case "delete-transaction": deleteTransaction(id); break;
    case "transaction-filter": transactionFilter = actionButton.dataset.filter || "all"; renderContent(); renderIcons(); break;
    case "select-transaction-type": setTransactionType(actionButton.dataset.type); break;
    case "add-budget": openBudgetModal(); break;
    case "delete-budget": deleteBudget(id); break;
    case "add-goal": openGoalModal(); break;
    case "contribute-goal": openGoalContributionModal(state.goals.find((goal) => goal.id === id)); break;
    case "delete-goal": deleteGoal(id); break;
    case "add-account": openAccountModal(); break;
    case "delete-account": deleteAccount(id); break;
    case "add-record": openRecordModal(); break;
    case "delete-record": deleteRecord(id); break;
    case "open-backup": openBackupModal(); break;
    case "export-json": exportJson(); break;
    case "export-csv": exportCsv(); break;
    case "trigger-import": document.getElementById("backupImport")?.click(); break;
    case "toggle-privacy": state.privacyMode = !state.privacyMode; saveState(); renderApp(); break;
    case "toggle-reminder": state.preferences.monthlyReminder = !state.preferences.monthlyReminder; saveState(); renderApp(); break;
    default: break;
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.dataset.form) return;
  event.preventDefault();
  switch (form.dataset.form) {
    case "transaction": submitTransaction(form); break;
    case "budget": submitBudget(form); break;
    case "goal": submitGoal(form); break;
    case "contribution": submitContribution(form); break;
    case "account": submitAccount(form); break;
    case "record": submitRecord(form); break;
    default: break;
  }
});

document.addEventListener("input", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement) || field.id !== "transactionSearch") return;
  transactionSearch = field.value;
  const cursor = field.selectionStart;
  renderContent(); renderIcons();
  const replacement = document.getElementById("transactionSearch");
  if (replacement) {
    replacement.focus();
    replacement.setSelectionRange(cursor, cursor);
  }
});

document.addEventListener("change", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLElement)) return;
  if (field instanceof HTMLSelectElement && field.dataset.setting === "language") {
    state.language = field.value === "ar" ? "ar" : "en";
    saveState(); renderApp();
  }
  if (field instanceof HTMLSelectElement && field.dataset.setting === "currency") {
    state.currency = field.value;
    saveState(); renderApp();
  }
  if (field instanceof HTMLInputElement && field.id === "backupImport" && field.files?.[0]) {
    restoreFromFile(field.files[0]);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.getElementById("modalLayer")?.classList.contains("open")) { closeModal(); return; }
  const isTyping = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement;
  if (!isTyping && event.key.toLowerCase() === "n" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault(); openTransactionModal();
  }
});

document.getElementById("languageToggle")?.addEventListener("click", () => {
  state.language = state.language === "ar" ? "en" : "ar";
  saveState(); renderApp();
});
document.getElementById("privacyToggle")?.addEventListener("click", () => { state.privacyMode = !state.privacyMode; saveState(); renderApp(); });
document.getElementById("mobileMenu")?.addEventListener("click", openMobileNavigation);
document.getElementById("profileMenu")?.addEventListener("click", () => navigate("settings"));
document.getElementById("openBackup")?.addEventListener("click", openBackupModal);

renderApp();
registerServiceWorker();
registerWebMcp();
maybeShowMonthlyReview();
