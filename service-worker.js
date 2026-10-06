const CACHE_NAME = "namaa-finance-shell-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./privacy.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => null)))));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('namaa-finance-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

function remember(request, response) {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

/* Pages, scripts and styles: the website first, so an update shows straight away;
 * without a connection (or after 3.5 s) the saved copy is used. Other files: saved copy first. */
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  const shell = request.mode === "navigate" || ["script", "style", "document"].includes(request.destination);
  if (shell) {
    event.respondWith((async () => {
      const saved = (await caches.match(request, { ignoreSearch: true })) || (request.mode === "navigate" ? await caches.match("./index.html") : undefined);
      const fresh = fetch(request, { cache: "no-cache" }).then((response) => remember(request, response));
      if (!saved) return fresh;
      const patience = new Promise((resolve) => setTimeout(() => resolve(saved), 3500));
      return Promise.race([fresh.catch(() => saved), patience]);
    })());
    return;
  }
  event.respondWith(
    caches.match(request).then((saved) => {
      const fresh = fetch(request).then((response) => remember(request, response)).catch(() => saved);
      return saved || fresh;
    })
  );
});
