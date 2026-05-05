/// <reference lib="webworker" />

import { Queue } from 'workbox-background-sync';

// Definición de tipos para el Service Worker
declare const self: ServiceWorkerGlobalScope;

// Endpoints permitidos para soporte offline
const ALLOWED_ENDPOINTS = [
  '/applicants',
  '/offers',
  '/profiles'
];

// Endpoints excluidos explícitamente (Auth, Pagos, etc.)
const EXCLUDED_ENDPOINTS = [
  '/auth',
  '/login',
  '/refresh',
  '/payments'
];

/**
 * Inicialización de la cola de Background Sync con lógica personalizada
 * de sincronización, orden FIFO y notificaciones al frontend.
 */
const queue = new Queue('servistudy-offline-queue', {
  maxRetentionTime: 24 * 60, // Retención por 24 horas
  onSync: async ({ queue }) => {
    let entry;
    // Procesamos la cola en orden (FIFO)
    while ((entry = await queue.shiftRequest())) {
      try {
        const response = await fetch(entry.request.clone());
        
        // Si el servidor responde (éxito o error 4xx/5xx), se considera procesada.
        // Solo reintentaremos si hay un fallo de red (catch).
        if (!response.ok) {
          console.error(`[Offline Sync] La petición falló en el servidor con status ${response.status}:`, entry.request.url);
        }
      } catch (error) {
        // Fallo de red (sigue offline): devolvemos la petición al inicio de la cola
        await queue.unshiftRequest(entry);
        console.warn('[Offline Sync] Error de red persistente. Sincronización pausada.');
        // Re-lanzar el error es necesario para que Background Sync reintente el evento más tarde
        throw error;
      }
    }

    // Una vez vaciada la cola con éxito, notificamos al frontend
    const clients = await self.clients.matchAll();
    clients.forEach((client: Client) => {
      client.postMessage({ type: 'SYNC_COMPLETED' });
    });
  }
});

/**
 * Helper para verificar si una petición idéntica ya reside en la cola.
 * Compara URL, Método y Cuerpo de la petición.
 */
const isDuplicateRequest = async (newRequest: Request) => {
  try {
    const entries = await queue.getAll();
    const newBodyText = await newRequest.clone().text();
    
    for (const entry of entries) {
      const entryReq = entry.request;
      if (entryReq.url === newRequest.url && entryReq.method === newRequest.method) {
        const entryBodyText = await entryReq.clone().text();
        if (entryBodyText === newBodyText) {
          return true;
        }
      }
    }
  } catch (error) {
    console.error('[Offline] Error al verificar duplicados en la cola:', error);
  }
  return false;
};

// Listener para interceptar peticiones fetch
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Filtrar por método mutable
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return;
  }

  // 2. Filtrar por endpoints permitidos (ofertas, postulaciones, perfiles)
  const isAllowed = ALLOWED_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint));
  const isExcluded = EXCLUDED_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint));

  if (!isAllowed || isExcluded) {
    return;
  }

  // 3. Manejo de la petición con lógica offline
  event.respondWith(
    (async () => {
      // Gestionar X-Request-Id (preservar si existe, o generar uno nuevo)
      let requestId = request.headers.get('X-Request-Id');
      if (!requestId) {
        requestId = crypto.randomUUID();
      }

      try {
        // Intentar realizar la petición normalmente
        const headers = new Headers(request.headers);
        headers.set('X-Request-Id', requestId);
        
        const modifiedRequest = new Request(request, { 
          headers,
          body: await request.clone().blob()
        });

        return await fetch(modifiedRequest);
      } catch (error) {
        // Fallo de red detectado (Offline)
        
        const headers = new Headers(request.headers);
        headers.set('X-Request-Id', requestId);

        const requestToQueue = new Request(request.url, {
          method: request.method,
          headers: headers,
          body: await request.clone().blob(),
          mode: request.mode,
          credentials: request.credentials,
          cache: request.cache,
          redirect: request.redirect,
          referrer: request.referrer,
          integrity: request.integrity,
        });

        // 4. Evitar duplicados: Solo encolamos si no hay una petición igual pendiente
        const duplicate = await isDuplicateRequest(requestToQueue);
        if (!duplicate) {
          await queue.pushRequest({ request: requestToQueue });
        } else {
          console.log('[Offline] Evitando duplicado en cola para:', request.url);
        }

        // 5. Respuesta informativa para el frontend
        // El campo 'offline: true' permite al cliente identificar que no es un éxito definitivo
        return new Response(
          JSON.stringify({
            offline: true,
            message: "Petición guardada. Se enviará automáticamente cuando recuperes la conexión.",
            requestId: requestId
          }),
          {
            status: 202,
            statusText: 'Accepted',
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    })()
  );
});

// Asegurar que el Service Worker tome el control de los clientes inmediatamente
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});
