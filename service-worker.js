/* Cache only the app shell. Financial records never enter CacheStorage. */
const CACHE_NAME = "namaa-finance-shell-v4-secure";
const APP_SHELL = ["./", "./index.html", "./styles.css", "./enhancements.css", "./app.js", "./enhancements.js", "./vault.js", "./finance-core.js", "./privacy.html", "./privacy.css", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon.svg"];
const SHELL_URLS = new Set(APP_SHELL.map(path => new URL(path, self.registration.scope).href));
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("namaa-finance-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  url.hash = ""; url.search = "";
  if (!SHELL_URLS.has(url.href)) return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache => {
    if (event.request.mode === "navigate") {
      try {
        const response = await fetch(event.request);
        if (response.ok && response.type === "basic") await cache.put(url.href, response.clone());
        return response;
      } catch { return await cache.match(url.href) || await cache.match(new URL("./index.html", self.registration.scope)); }
    }
    return await cache.match(url.href) || fetch(event.request);
  }));
});
