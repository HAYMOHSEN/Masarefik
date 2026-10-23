/* End-to-end verification against a temporary local web server. Uses fictitious data. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');
const root = path.resolve(__dirname, '..');
const out = process.env.NAMAA_TEST_OUTPUT || path.join(require('node:os').tmpdir(), 'namaa-ui-tests');
fs.mkdirSync(out, { recursive:true });
const mime = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.webmanifest':'application/manifest+json' };
const server = http.createServer((req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file += '/index.html';
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
let browser;
const checks = [], errors = [];
const ok = name => { checks.push(name); console.log('PASS ' + name); };
async function idle(p) { await p.waitForFunction(() => !uiBusy); }
async function action(p, name) { await idle(p); await p.locator(`button[data-action="${name}"]:visible`).first().click(); await idle(p); }
async function submit(p) { await p.locator('#modalLayer form button[type="submit"]').click(); await idle(p); }
async function nav(p, page) { await idle(p); await p.locator(`#sideNav [data-page="${page}"]`).click(); }
async function account(p, name, amount) {
  await action(p, 'add-account'); await p.fill('#account-name',name); await p.fill('#account-opening',String(amount)); await submit(p);
}
async function tx(p, type, name, amount) {
  await action(p,type === 'income' ? 'quick-income' : 'quick-expense');
  await p.fill('#transaction-description',name); await p.fill('#transaction-amount',String(amount)); await submit(p);
}
async function unlock(p, password) {
  await p.fill('#unlock-password',password); await p.locator('#lockScreen button[type="submit"]').click(); await idle(p);
}
async function main() {
  await new Promise(r => server.listen(0,'127.0.0.1',r));
  const url = `http://127.0.0.1:${server.address().port}/`;
  browser = await chromium.launch({ headless:true, args:['--no-sandbox'], ...(process.env.NAMAA_BROWSER_PATH ? {executablePath:process.env.NAMAA_BROWSER_PATH} : {}) });
  const context = await browser.newContext({ viewport:{width:1440,height:1000}, locale:'en-GB', timezoneId:'Asia/Amman', acceptDownloads:true, serviceWorkers:'block' });
  const p = await context.newPage();
  p.on('pageerror',e => errors.push(e.message));
  p.on('dialog',d => d.accept());
  await p.goto(url); await idle(p);
  assert.equal(await p.evaluate(()=>state.transactions.length + state.accounts.length),0);
  ok('fresh workspace contains no invented financial data');
  await action(p,'add-account'); await p.fill('#account-name','Test Bank'); await p.fill('#account-opening','1000'); await submit(p);
  await nav(p,'accounts'); await account(p,'Test Cash',0);
  await nav(p,'dashboard'); await tx(p,'income','PRIVATE_SALARY',2400.125); await tx(p,'expense','Groceries',120.035);
  assert.equal(await p.evaluate(()=>totalBalance()),3280.09); assert.equal(await p.evaluate(()=>monthIncome()),2400.125);
  ok('accounts, income, expenses and three-decimal JOD totals work through forms');
  await nav(p,'transfers'); await action(p,'add-transfer'); await p.fill('#extra-amount','100.015'); await submit(p);
  assert.deepEqual(await p.evaluate(()=>state.accounts.map(x=>accountBalance(x.id))),[3180.075,100.015]); assert.equal(await p.evaluate(()=>monthIncome()),2400.125); assert.equal(await p.evaluate(()=>monthExpense()),120.035);
  ok('transfer updates both accounts without changing income or expenses');
  await nav(p,'bills'); await action(p,'add-bill'); await p.fill('#bill-name','Test Internet'); await p.fill('#extra-amount','25.5'); await p.fill('#bill-due','2027-01-31'); await submit(p);
  await action(p,'pay-bill'); assert.equal(await p.evaluate(()=>state.bills[0].nextDue),'2027-02-28'); assert.equal(await p.evaluate(()=>state.transactions.length),3);
  ok('bill payment creates an expense and advances the month-end date');
  await nav(p,'transactions'); await action(p,'duplicate-transaction'); assert.equal(await p.locator('form[data-form="transaction"]').getAttribute('data-record-id'),''); await action(p,'close-modal');
  await p.fill('#transactionSearch','PRIVATE_SALARY'); assert.equal(await p.locator('.data-table tbody tr').count(),1);
  await action(p,'clear-filters'); await p.selectOption('#filter-category','food'); assert.equal(await p.locator('.data-table tbody tr').count(),1);
  await action(p,'clear-filters'); ok('duplicate form and combined transaction filters work');
  await nav(p,'budgets'); await action(p,'add-budget'); await p.fill('#budget-limit','100'); await submit(p);
  assert.match(await p.locator('.budget-card-foot').innerText(),/120%/);
  await action(p,'add-budget'); await p.fill('#budget-limit','200'); await submit(p); assert.equal(await p.evaluate(()=>state.budgets.length),1);
  ok('budget limits update by category and overspending percentages remain accurate');
  await nav(p,'goals'); await action(p,'add-goal'); await p.fill('#goal-name','Emergency fund'); await p.fill('#goal-target','1000'); await p.fill('#goal-saved','10'); await submit(p);
  const balanceBeforeGoal=await p.evaluate(()=>totalBalance()); await action(p,'contribute-goal'); await p.fill('#contribution-amount','5.125'); await submit(p); assert.equal(await p.evaluate(()=>state.goals[0].saved),15.125); assert.equal(await p.evaluate(()=>totalBalance()),balanceBeforeGoal);
  ok('goal progress retains precision without changing account balances');
  await nav(p,'vault'); await action(p,'add-record'); await p.fill('#record-title','Insurance reference'); await p.fill('#record-value','PRIVATE_NOTE <img src=x onerror=alert(1)>'); await submit(p); assert.equal(await p.locator('.vault-card img').count(),0); assert.match(await p.locator('.vault-card').innerText(),/PRIVATE_NOTE/);
  ok('financial notes render imported-looking HTML as escaped text');
  await nav(p,'accounts'); await action(p,'add-account'); await p.fill('#account-name','Unsaved account');
  const previousRaw=await p.evaluate(()=>localStorage.getItem(STORAGE_KEY));
  await p.evaluate(()=>{globalThis.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='namaa-finance-v1')throw new DOMException('Full','QuotaExceededError');return originalSetItem.call(this,key,value)}});
  await submit(p); assert.equal(await p.evaluate(()=>state.accounts.length),2); assert.equal(await p.evaluate(()=>localStorage.getItem(STORAGE_KEY)),previousRaw); assert.match(await p.locator('.inline-error').innerText(),/storage/);
  await p.evaluate(()=>{Storage.prototype.setItem=originalSetItem;delete globalThis.originalSetItem}); await action(p,'close-modal');
  ok('a failed storage write preserves records and leaves the form available');
  await nav(p,'settings'); await p.fill('#display-name','Private Person'); await p.locator('form[data-form="profile"] button').click(); await idle(p);
  await action(p,'enable-password'); await p.fill('#password-next','correct-horse-namaa-2026'); await p.fill('#password-confirmation','not-the-same-passphrase'); await submit(p);
  assert.match(await p.locator('.inline-error').innerText(),/do not match/);
  await p.fill('#password-confirmation','correct-horse-namaa-2026'); await submit(p);
  const raw = await p.evaluate(()=>localStorage.getItem(STORAGE_KEY)); assert.equal(JSON.parse(raw).format,'namaa-encrypted-v1'); assert.equal(raw.includes('PRIVATE_SALARY'),false); assert.equal(raw.includes('Private Person'),false); assert.equal(raw.includes('PRIVATE_NOTE'),false);
  ok('password setup handles mismatch and replaces plaintext with encrypted records');
  await action(p,'lock-workspace'); assert.equal(await p.locator('#appContent').innerText(),''); assert.equal(await p.evaluate(()=>state.transactions.length),0); assert.equal(await p.locator('body').innerText().then(x=>x.includes('PRIVATE_SALARY')),false);
  await p.screenshot({path:path.join(out,'lock-en.png')});
  await unlock(p,'wrong-passphrase'); assert.match(await p.locator('#unlockError').innerText(),/incorrect/);
  await unlock(p,'correct-horse-namaa-2026'); assert.equal(await p.evaluate(()=>state.transactions.length),3);
  ok('manual lock clears records from the UI and memory; wrong passwords are rejected');
  await p.reload(); await p.waitForSelector('#unlock-password'); assert.equal(await p.locator('#appShell').isVisible(),false); await unlock(p,'correct-horse-namaa-2026');
  ok('reload opens the lock screen without exposing saved records');
  await nav(p,'settings'); await action(p,'change-password'); await p.fill('#password-current','incorrect-passphrase'); await p.fill('#password-next','changed-namaa-passphrase-2026'); await p.fill('#password-confirmation','changed-namaa-passphrase-2026'); await submit(p); assert.match(await p.locator('.inline-error').innerText(),/incorrect/);
  await p.fill('#password-current','correct-horse-namaa-2026'); await submit(p); await action(p,'lock-workspace'); await unlock(p,'correct-horse-namaa-2026'); assert.equal(await p.locator('#appShell').isVisible(),false); await unlock(p,'changed-namaa-passphrase-2026');
  ok('password rotation verifies the old password and accepts only the new one afterwards');
  await p.locator('#openBackup').click(); const downloadPromise=p.waitForEvent('download'); await action(p,'export-json'); const download=await downloadPromise; const backupPath=path.join(out,'encrypted-backup.json'); await download.saveAs(backupPath); assert.equal(fs.readFileSync(backupPath,'utf8').includes('PRIVATE_SALARY'),false);
  await p.locator('#backupImport').setInputFiles(backupPath); await idle(p); await p.fill('#password-current','changed-namaa-passphrase-2026'); await submit(p); assert.equal(await p.evaluate(()=>state.transactions.length),3); assert.equal(await p.evaluate(()=>vaultStore.secured),true);
  ok('encrypted backup downloads and restores without changing the local password');
  await nav(p,'settings'); await p.selectOption('#theme-select','dark'); await idle(p); assert.equal(await p.locator('html').getAttribute('data-theme'),'dark');
  await p.selectOption('[data-setting="language"]','ar'); await idle(p); assert.equal(await p.locator('html').getAttribute('dir'),'rtl');
  await p.screenshot({path:path.join(out,'settings-ar-dark.png'),fullPage:true});
  await p.selectOption('#theme-select','light'); await idle(p); await nav(p,'bills'); await p.screenshot({path:path.join(out,'bills-ar.png'),fullPage:true});
  ok('Arabic RTL, profile settings and dark mode persist');
  await p.setViewportSize({width:390,height:844}); await p.screenshot({path:path.join(out,'mobile-ar.png'),fullPage:true}); assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true); await p.locator('#mobileMenu').click(); assert.equal(await p.locator('.modal-layer.open [data-page="bills"]').count(),1); await action(p,'close-modal');
  ok('mobile Arabic layout fits the viewport and exposes all pages');
  await p.setViewportSize({width:1440,height:1000}); await p.evaluate(()=>{lastActivity = Date.now()-state.preferences.autoLockMinutes*60000-1000}); await p.waitForSelector('#unlock-password');
  ok('inactivity timer locks the workspace');
  await unlock(p,'changed-namaa-passphrase-2026'); await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));}); await p.waitForSelector('#unlock-password'); await p.evaluate(()=>{delete document.hidden});
  ok('background visibility triggers password locking');
  await unlock(p,'changed-namaa-passphrase-2026'); await nav(p,'settings'); await action(p,'remove-password'); await p.fill('#password-current','changed-namaa-passphrase-2026'); await submit(p); assert.equal(await p.evaluate(()=>vaultStore.secured),false); assert.equal(await p.evaluate(()=>state.transactions.length),3);
  ok('removing protection requires a password and retains the records');
  const q = await context.newPage(); q.on('dialog',d=>d.accept()); await q.goto(url); await idle(q); await p.locator('#languageToggle').click(); await idle(p); await q.waitForSelector('[data-gate="reload"]'); assert.equal(await q.locator('#appShell').isVisible(),false);
  ok('another window cannot silently overwrite a changed workspace');
  await context.close();
  const legacy = await browser.newContext({serviceWorkers:'block'}), lp = await legacy.newPage();
  await lp.addInitScript(()=>localStorage.setItem('namaa-finance-v1',JSON.stringify({version:2,language:'en',currency:'JOD',accounts:[{id:'old',name:'Legacy account',type:'bank',openingBalance:41.5}],transactions:[{id:'old-tx',description:'Existing record',type:'expense',category:'food',amount:1.125,date:'2026-10-23',accountId:'old',note:''}],preferences:{monthlyReminder:false}})));
  await lp.goto(url); await idle(lp); assert.equal(await lp.evaluate(()=>totalBalance()),40.375); assert.equal(await lp.evaluate(()=>state.accounts[0].id),'old');
  ok('old plaintext workspaces migrate with IDs, records and balances intact'); await legacy.close();
  // Real service-worker test in a clean origin, with no mocked network replies.
  const offline = await browser.newContext(), op = await offline.newPage();
  await op.goto(url); await op.evaluate(()=>navigator.serviceWorker.ready); await op.reload(); await idle(op);
  await action(op,'add-account'); await op.fill('#account-name','Offline account'); await op.fill('#account-opening','20'); await submit(op); await action(op,'enable-password'); await op.fill('#password-next','offline-test-password'); await op.fill('#password-confirmation','offline-test-password'); await submit(op);
  await offline.setOffline(true); await op.reload(); await op.waitForSelector('#unlock-password'); await unlock(op,'offline-test-password'); assert.equal(await op.evaluate(()=>totalBalance()),20);
  const cached = await op.evaluate(async()=>{const c=await caches.open('namaa-finance-shell-v4-secure');return (await c.keys()).map(x=>new URL(x.url).pathname)}); assert(cached.every(x=>!x.includes('backup')));
  ok('app shell opens offline and the cache contains only app assets'); await offline.close();
  assert.deepEqual(errors,[]); ok('no uncaught browser JavaScript errors');
  fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:checks.length,checks,errors},null,2));
  console.log(`Completed ${checks.length} browser checks.`);
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
