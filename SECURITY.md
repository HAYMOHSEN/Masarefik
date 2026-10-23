# Security design — Namaa Finance secure edition

Password protection is optional. When enabled, the original `namaa-finance-v1` localStorage value is replaced with an authenticated encrypted envelope after encryption and verification succeed. There is no second plaintext copy retained by the app. This cannot erase previous disk history, OS backups, browser snapshots or earlier downloads.

Web Crypto derives a non-exportable 256-bit AES key using PBKDF2-HMAC-SHA-256 with 600,000 iterations and a random 16-byte salt. Encryption uses AES-256-GCM with a fresh random 12-byte IV per save and a 128-bit tag. Envelope version, algorithms, work factor and salt are authenticated as additional data. Passwords and keys are never written to localStorage or sessionStorage. Passwords are not silently trimmed or normalized. New passwords must contain 12–256 characters.

Decrypted data and transient credentials exist in memory while needed. Locking clears application references and removes rendered financial content. JavaScript cannot guarantee secure memory zeroization. Unlock inputs are cleared on each attempt; password forms are reset and removed on completion or close.

Changing or removing protection verifies the current password. A password change uses a new key and salt; removing protection deliberately restores plaintext storage. Old exported backups retain their original passwords. Backup restoration validates data before confirmation and does not change the current local password or encryption mode. Older plaintext Namaa JSON imports are supported. Imports over 16 MB, invalid dates/amounts, duplicate IDs, or orphaned account references are refused.

The app stays hidden until loading or unlocking finishes. Reloading protected data opens the lock screen. Manual, configurable inactivity (default five minutes), and optional background locking (default on) clear the workspace. Five failed unlock attempts introduce an in-session 30-second delay. This delay does not stop offline attacks on a copied file; password strength and the derivation work factor matter for those attacks.

The interface serializes mutations and awaits persistence. Storage revisions are checked before writes and Web Locks are used where available. Other-window changes cause a lock/reload screen. A failed storage write leaves the previous stored value intact. The service worker caches only an explicit allowlist of app assets and removes only old Namaa caches.

A content security policy limits scripts to local files and forbids inline scripts, objects and form navigation. Inline CSS remains allowed for existing charts. User strings are HTML-escaped and imported records are validated. CSV formula prefixes are neutralized. The previous optional WebMCP read/write hooks were removed so they cannot bypass the lock controller.

## Limits

- No publisher password reset, recovery email, cloud account, bank connection, or device sync.
- Anyone with the password, an unlocked session, malicious browser extensions, malware, or control of the host or app code may access records. This is protection of stored records at rest, not a claim of protection from a compromised device or host.
- CSV exports, printing and saved PDFs are not encrypted by the app. Browser/OS histories are outside app control.
- Site-data removal, profile deletion, or uninstall flows can delete local records. Keep encrypted backups and their passwords.
- Changes to domain, browser profile or Store webview can change the storage used by the app.
- Automated and browser verification do not replace an independent security audit or Windows Store certification.

## Documentation consulted on 23 October 2026

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): PBKDF2-HMAC-SHA-256 work-factor guidance. This does not imply FIPS certification.
- [MDN Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): secure-context requirements and Web Crypto primitives.
- [MDN AES-GCM parameters](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams): IV, tag and authenticated additional data.
