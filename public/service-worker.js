// Definimos un nombre y versión para nuestro caché
const CACHE_NAME = 'calculadora-materiales-v1';

// Lista de archivos y recursos que queremos cachear
const urlsToCache = [
  '/',
  '/index.html',
  // Es importante tener en cuenta que los recursos de esm.sh también se cachearán dinámicamente.
];

// Evento 'install': se dispara cuando el Service Worker se instala.
// Aquí es donde cacheamos nuestros archivos estáticos.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la aplicación realiza una petición (ej. una imagen, un script, una página).
// Implementamos una estrategia "Cache first, then network":
// 1. Intentamos servir el recurso desde el caché.
// 2. Si no está en el caché, lo buscamos en la red.
// 3. Si lo encontramos en la red, lo guardamos en el caché para la próxima vez.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si encontramos una respuesta en el caché, la devolvemos
        if (response) {
          return response;
        }

        // Si no, hacemos la petición a la red
        return fetch(event.request).then(
          (networkResponse) => {
            // Si la petición falla, no hacemos nada.
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && !networkResponse.type.includes('cors')) {
              return networkResponse;
            }

            // Clonamos la respuesta porque es un "stream" que solo se puede consumir una vez.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
  );
});

// Evento 'activate': se dispara cuando un nuevo Service Worker se activa.
// Aquí limpiamos los cachés antiguos para evitar usar archivos desactualizados.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
