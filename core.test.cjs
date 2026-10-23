const { test } = require('node:test');
const assert = require('node:assert/strict');
const C = require('../finance-core.js');
function data() {
  return { version: 2, language:'en', currency:'JOD', profile:{name:'Test'}, preferences:{}, accounts:[{id:'a',name:'Bank',type:'bank',openingBalance:1000},{id:'b',name:'Cash',type:'cash',openingBalance:0}], transactions:[], budgets:[], goals:[], vaultNotes:[], transfers:[], bills:[] };
}
test('transfers conserve total balance and do not create income or expense', () => {
  const s = data(); s.transfers.push({id:'x',fromAccountId:'a',toAccountId:'b',date:'2026-10-23',amount:125.075,note:''});
  const n = C.normalize(s,data()); assert.equal(C.balance(n,'a'),874.925); assert.equal(C.balance(n,'b'),125.075); assert.equal(C.sum(n.accounts.map(x=>C.balance(n,x.id))),1000); assert.equal(n.transactions.length,0);
});
test('monthly schedules preserve January 31 through February', () => {
  const feb = C.nextOccurrence('2027-01-31','monthly'); assert.equal(feb,'2027-02-28'); assert.equal(C.nextOccurrence(feb,'monthly','2027-01-31'),'2027-03-31');
});
test('leap-day yearly schedules retain the original anniversary', () => {
  assert.equal(C.nextOccurrence('2024-02-29','yearly'),'2025-02-28'); assert.equal(C.nextOccurrence('2027-02-28','yearly','2024-02-29'),'2028-02-29');
});
test('weekly reminders respect seven-day frequency', () => { assert.equal(C.upcoming({date:'2026-10-01',frequency:'weekly'},'2026-10-23'),'2026-10-29'); });
test('strict dates reject impossible calendar dates', () => { assert.throws(()=>C.date('2026-02-30')); assert.throws(()=>C.date('2026-13-01')); assert.equal(C.date('2024-02-29'),'2024-02-29'); });
test('amount math retains three decimal places without float drift', () => { assert.equal(C.sum([.1,.2,.005]),.305); assert.equal(C.sum([.305,-.3]),.005); });
test('malformed imports cannot create orphaned or invalid transactions', () => {
  for (const change of [{accountId:'missing'},{amount:Infinity},{amount:-1},{date:'2026-02-30'},{category:'__proto__'},{type:'transfer'}]) {
    const s = data(); s.transactions.push({id:'t',description:'X',accountId:'a',amount:10,type:'expense',category:'food',date:'2026-10-23',note:'',...change}); assert.throws(()=>C.normalize(s,data()));
  }
});
test('duplicate IDs and transfers to the same account are rejected', () => {
  const s = data(); s.accounts.push(s.accounts[0]); assert.throws(()=>C.normalize(s,data()));
  const x = data(); x.transfers.push({id:'t',fromAccountId:'a',toAccountId:'a',date:'2026-10-23',amount:5}); assert.throws(()=>C.normalize(x,data()));
});
test('recording a bill produces an expense and advances the due date', () => {
  const s = data(); s.bills.push({id:'bill',name:'Rent',amount:400,category:'housing',accountId:'a',frequency:'monthly',nextDue:'2027-01-31',anchorDate:'2027-01-31',active:true});
  C.payBill(s,'bill','pay1','2027-01-31'); assert.equal(s.transactions.length,1); assert.equal(C.balance(s,'a'),600); assert.equal(s.bills[0].nextDue,'2027-02-28');
  C.payBill(s,'bill','pay2','2027-02-28'); assert.equal(s.bills[0].nextDue,'2027-03-31'); assert.doesNotThrow(()=>C.normalize(s,data()));
});
test('one-time bills can only be recorded once', () => {
  const s = data(); s.bills.push({id:'bill',name:'Insurance',amount:50,category:'utilities',accountId:'a',frequency:'once',nextDue:'2026-10-23'});
  C.payBill(s,'bill','pay','2026-10-23'); assert.equal(s.bills[0].active,false); assert.throws(()=>C.payBill(s,'bill','other','2026-10-23')); assert.equal(s.transactions.length,1);
});
test('legacy duplicate budgets consolidate to the last category limit', () => {
  const s = data(); s.budgets=[{id:'1',category:'food',limit:100},{id:'2',category:'food',limit:150}]; assert.deepEqual(C.normalize(s,data()).budgets,[{id:'2',category:'food',limit:150}]);
});
test('CSV exports escape quotes, newlines and formula injection', () => {
  assert.equal(C.csvCell('=1+1'),'"\'=1+1"'); assert.equal(C.csvCell(' @SUM(A1)'),'"\' @SUM(A1)"'); assert.equal(C.csvCell('He said "hello"'),'"He said ""hello"""'); assert.equal(C.csvCell('مرحبا'),'"مرحبا"');
});

test('unknown future schema versions are rejected instead of silently downgraded', () => {
  const s = data(); s.version = 99; assert.throws(()=>C.normalize(s,data()));
});
