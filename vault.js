/* Namaa vault. No password, verifier or encryption key is written to storage. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NamaaCrypto = api;
})(globalThis, function () {
  "use strict";
  const FORMAT = "namaa-encrypted-v1", ITERATIONS = 600000;
  const encoder = new TextEncoder(), decoder = new TextDecoder("utf-8", { fatal: true });
  function fail(code) { return new Error(code); }
  function cryptoApi() {
    if (!globalThis.crypto?.subtle) throw fail("SECURE_CONTEXT_REQUIRED");
    return globalThis.crypto;
  }
  function base64(bytes) {
    let value = "";
    for (let i = 0; i < bytes.length; i += 8192) value += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(value);
  }
  function unbase64(value, max = 24000000) {
    if (typeof value !== "string" || value.length > max || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) throw fail("INVALID_VAULT");
    return Uint8Array.from(atob(value), char => char.charCodeAt(0));
  }
  function isEncrypted(value) { return value?.format === FORMAT; }
  function validateEnvelope(value) {
    if (!isEncrypted(value) || value.version !== 1 || value.kdf !== "PBKDF2-SHA256" || value.cipher !== "AES-256-GCM" || value.iterations !== ITERATIONS) throw fail("INVALID_VAULT");
    if (unbase64(value.salt, 32).length !== 16 || unbase64(value.iv, 32).length !== 12 || unbase64(value.data).length < 16) throw fail("INVALID_VAULT");
    return value;
  }
  function header(salt) { return { format: FORMAT, version: 1, kdf: "PBKDF2-SHA256", cipher: "AES-256-GCM", iterations: ITERATIONS, salt }; }
  function aad(value) { return encoder.encode(JSON.stringify(header(value.salt))); }
  function checkPassword(password) {
    if (typeof password !== "string" || [...password].length < 12 || password.length > 256) throw fail("PASSWORD_LENGTH");
  }
  async function derive(password, salt) {
    if (typeof password !== "string" || password.length > 256) throw fail("WRONG_PASSWORD");
    const raw = encoder.encode(password);
    try {
      const material = await cryptoApi().subtle.importKey("raw", raw, "PBKDF2", false, ["deriveKey"]);
      return await cryptoApi().subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONS, salt: unbase64(salt, 32) }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    } finally { raw.fill(0); }
  }
  async function encrypt(data, key, salt) {
    const meta = header(salt), iv = cryptoApi().getRandomValues(new Uint8Array(12));
    const raw = encoder.encode(JSON.stringify(data));
    try {
      const ciphertext = await cryptoApi().subtle.encrypt({ name: "AES-GCM", iv, tagLength: 128, additionalData: aad(meta) }, key, raw);
      return { ...meta, iv: base64(iv), data: base64(new Uint8Array(ciphertext)) };
    } finally { raw.fill(0); }
  }
  async function decrypt(value, key) {
    validateEnvelope(value);
    let raw;
    try {
      raw = new Uint8Array(await cryptoApi().subtle.decrypt({ name: "AES-GCM", iv: unbase64(value.iv, 32), tagLength: 128, additionalData: aad(value) }, key, unbase64(value.data)));
      return JSON.parse(decoder.decode(raw));
    } catch { throw fail("WRONG_PASSWORD"); }
    finally { raw?.fill(0); }
  }
  async function seal(data, password) {
    checkPassword(password);
    const salt = base64(cryptoApi().getRandomValues(new Uint8Array(16)));
    return encrypt(data, await derive(password, salt), salt);
  }
  async function open(value, password) {
    validateEnvelope(value);
    return decrypt(value, await derive(password, value.salt));
  }
  class Store {
    #storage; #name; #key = null; #salt = null; #raw = null; #ready = false; #secure = false;
    constructor(storage, name) { this.#storage = storage; this.#name = name; }
    get secured() { return this.#secure; }
    get ready() { return this.#ready; }
    get currentRaw() { return this.#raw; }
    load() {
      this.lock();
      this.#raw = this.#storage.getItem(this.#name);
      const value = this.#raw === null ? null : JSON.parse(this.#raw);
      this.#secure = isEncrypted(value);
      if (this.#secure) { validateEnvelope(value); return null; }
      this.#ready = true;
      return value;
    }
    async unlock(password) {
      const raw = this.#storage.getItem(this.#name), value = validateEnvelope(JSON.parse(raw));
      const key = await derive(password, value.salt), data = await decrypt(value, key);
      if (this.#storage.getItem(this.#name) !== raw) throw fail("STORAGE_CONFLICT");
      this.#key = key; this.#salt = value.salt; this.#raw = raw; this.#ready = true; this.#secure = true;
      return data;
    }
    lock() { this.#key = null; this.#salt = null; this.#ready = false; }
    async #exclusive(task) {
      if (globalThis.navigator?.locks) return navigator.locks.request("namaa-storage:" + this.#name, task);
      return task();
    }
    #assertCurrent() {
      if (!this.#ready) throw fail("VAULT_LOCKED");
      if (this.#storage.getItem(this.#name) !== this.#raw) throw fail("STORAGE_CONFLICT");
    }
    #write(raw) {
      this.#assertCurrent();
      this.#storage.setItem(this.#name, raw);
      this.#raw = raw;
    }
    async save(data) {
      return this.#exclusive(async () => {
        this.#assertCurrent();
        const raw = JSON.stringify(this.#secure ? await encrypt(data, this.#key, this.#salt) : data);
        this.#write(raw);
      });
    }
    async protect(data, password) {
      checkPassword(password);
      return this.#exclusive(async () => {
        this.#assertCurrent();
        if (this.#secure) throw fail("ALREADY_PROTECTED");
        const salt = base64(cryptoApi().getRandomValues(new Uint8Array(16))), key = await derive(password, salt);
        const value = await encrypt(data, key, salt);
        await decrypt(value, key); // Verify before replacing the only persisted copy.
        this.#write(JSON.stringify(value));
        this.#key = key; this.#salt = salt; this.#secure = true;
      });
    }
    async changePassword(data, currentPassword, nextPassword) {
      checkPassword(nextPassword);
      return this.#exclusive(async () => {
        this.#assertCurrent();
        if (!this.#secure) throw fail("VAULT_LOCKED");
        await open(JSON.parse(this.#raw), currentPassword);
        const salt = base64(cryptoApi().getRandomValues(new Uint8Array(16))), key = await derive(nextPassword, salt);
        const value = await encrypt(data, key, salt);
        await decrypt(value, key);
        this.#write(JSON.stringify(value));
        this.#key = key; this.#salt = salt;
      });
    }
    async removePassword(data, password) {
      return this.#exclusive(async () => {
        this.#assertCurrent();
        if (!this.#secure) throw fail("VAULT_LOCKED");
        await open(JSON.parse(this.#raw), password);
        this.#write(JSON.stringify(data));
        this.#secure = false; this.#key = null; this.#salt = null;
      });
    }
    async encryptedBackup() {
      this.#assertCurrent();
      if (!this.#secure) throw fail("VAULT_LOCKED");
      return this.#raw;
    }
  }
  return Object.freeze({ FORMAT, ITERATIONS, isEncrypted, validateEnvelope, checkPassword, seal, open, Store });
});
