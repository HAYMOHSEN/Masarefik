const { test } = require('node:test');
const assert = require('node:assert/strict');
const V = require('../vault.js');
const password = 'Test-only-passphrase!2026';
function memory() { const m = new Map(); return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}; }
test('AES-GCM backups round-trip Unicode, reject wrong passwords and reveal no data', async () => {
  const data={name:'اختبار',description:'SECRET_SALARY',balance:123.456};
  const sealed=await V.seal(data,password); assert.equal(sealed.iterations,600000); assert.equal(JSON.stringify(sealed).includes('SECRET_SALARY'),false); assert.equal(JSON.stringify(sealed).includes(password),false); assert.deepEqual(await V.open(sealed,password),data); await assert.rejects(()=>V.open(sealed,'incorrect-password'),/WRONG_PASSWORD/);
});
test('ciphertext and metadata tampering are rejected', async () => {
  const x=await V.seal({a:1},password);
  const tampered={...x,data:(x.data[0]==='A'?'B':'A')+x.data.slice(1)}; await assert.rejects(()=>V.open(tampered,password));
  await assert.rejects(()=>V.open({...x,iterations:1},password),/INVALID_VAULT/);
  await assert.rejects(()=>V.open({...x,iv:'AA=='},password),/INVALID_VAULT/);
});
test('new backups use independent salts and nonces', async () => { const a=await V.seal({x:1},password),b=await V.seal({x:1},password); assert.notEqual(a.salt,b.salt); assert.notEqual(a.iv,b.iv); assert.notEqual(a.data,b.data); });
test('enabling protection replaces the legacy plaintext; lock drops access', async () => {
  const storage=memory(),s=new V.Store(storage,'v'); storage.setItem('v',JSON.stringify({secret:'private'})); assert.deepEqual(s.load(),{secret:'private'});
  await s.protect({secret:'private'},password); assert.equal(storage.getItem('v').includes('private'),false); assert.equal(s.secured,true);
  s.lock(); await assert.rejects(()=>s.save({secret:'x'}),/VAULT_LOCKED/); assert.deepEqual(await s.unlock(password),{secret:'private'});
  const iv=JSON.parse(storage.getItem('v')).iv; await s.save({secret:'changed'}); assert.notEqual(JSON.parse(storage.getItem('v')).iv,iv); assert.equal(storage.getItem('v').includes('changed'),false);
});
test('password rotation requires the old password and invalidates it afterwards', async () => {
  const storage=memory(),s=new V.Store(storage,'v'); s.load(); await s.protect({amount:4},password); const raw=storage.getItem('v');
  await assert.rejects(()=>s.changePassword({amount:4},'wrong-password','a-new-secure-passphrase'),/WRONG_PASSWORD/); assert.equal(storage.getItem('v'),raw);
  await s.changePassword({amount:4},password,'a-new-secure-passphrase'); s.lock(); await assert.rejects(()=>s.unlock(password)); assert.deepEqual(await s.unlock('a-new-secure-passphrase'),{amount:4});
});
test('removing protection requires verification and leaves current records intact', async () => {
  const storage=memory(),s=new V.Store(storage,'v'); s.load(); await s.protect({amount:5},password); await assert.rejects(()=>s.removePassword({amount:5},'wrong-password')); assert.equal(s.secured,true);
  await s.removePassword({amount:5},password); assert.equal(s.secured,false); assert.deepEqual(JSON.parse(storage.getItem('v')),{amount:5});
});
test('a stale window cannot overwrite newer saved records', async () => {
  const storage=memory(),a=new V.Store(storage,'v'),b=new V.Store(storage,'v'); a.load(); b.load(); await a.save({n:1}); await assert.rejects(()=>b.save({n:2}),/STORAGE_CONFLICT/); assert.deepEqual(JSON.parse(storage.getItem('v')),{n:1});
});
test('encryption failure or full storage never deletes the last plaintext copy', async () => {
  const m=memory(); m.setItem('v','{"original":true}'); const storage={getItem:m.getItem,setItem:()=>{throw Object.assign(new Error('quota'),{name:'QuotaExceededError'});}};
  const s=new V.Store(storage,'v'); s.load(); await assert.rejects(()=>s.protect({original:true},password)); assert.equal(m.getItem('v'),'{"original":true}'); assert.equal(s.secured,false);
});
test('short passwords and malformed envelopes are refused', async () => {
  await assert.rejects(()=>V.seal({x:1},'short'),/PASSWORD_LENGTH/); assert.throws(()=>V.validateEnvelope({format:V.FORMAT}));
});
