const CACHE_NAME =
    "lovieos-daily-v1";


const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/apple-touch-icon.png"
];


/* ========================= */
/* INSTALL */
/* ========================= */

self.addEventListener(
    "install",
    (event) => {

        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(
                    (cache) => {

                        return cache.addAll(
                            APP_FILES
                        );
                    }
                )
        );


        self.skipWaiting();
    }
);


/* ========================= */
/* ACTIVATE */
/* ========================= */

self.addEventListener(
    "activate",
    (event) => {

        event.waitUntil(
            caches
                .keys()
                .then(
                    (cacheNames) => {

                        return Promise.all(
                            cacheNames.map(
                                (cacheName) => {

                                    if (
                                        cacheName !==
                                        CACHE_NAME
                                    ) {
                                        return caches.delete(
                                            cacheName
                                        );
                                    }


                                    return null;
                                }
                            )
                        );
                    }
                )
        );


        self.clients.claim();
    }
);


/* ========================= */
/* FETCH */
/* ========================= */

self.addEventListener(
    "fetch",
    (event) => {

        if (
            event.request.method !==
            "GET"
        ) {
            return;
        }


        const requestURL =
            new URL(
                event.request.url
            );


        if (
            requestURL.origin !==
            self.location.origin
        ) {
            return;
        }


        if (
            event.request.mode ===
            "navigate"
        ) {
            event.respondWith(
                fetch(
                    event.request
                )
                    .then(
                        (response) => {

                            const responseCopy =
                                response.clone();


                            caches
                                .open(
                                    CACHE_NAME
                                )
                                .then(
                                    (cache) => {

                                        cache.put(
                                            event.request,
                                            responseCopy
                                        );
                                    }
                                );


                            return response;
                        }
                    )
                    .catch(
                        () => {

                            return caches.match(
                                "./index.html"
                            );
                        }
                    )
            );


            return;
        }


        event.respondWith(
            caches
                .match(
                    event.request
                )
                .then(
                    (cachedResponse) => {

                        const networkResponse =
                            fetch(
                                event.request
                            )
                                .then(
                                    (response) => {

                                        if (
                                            response &&
                                            response.status ===
                                            200
                                        ) {
                                            const responseCopy =
                                                response.clone();


                                            caches
                                                .open(
                                                    CACHE_NAME
                                                )
                                                .then(
                                                    (cache) => {

                                                        cache.put(
                                                            event.request,
                                                            responseCopy
                                                        );
                                                    }
                                                );
                                        }


                                        return response;
                                    }
                                );


                        return (
                            cachedResponse ||
                            networkResponse
                        );
                    }
                )
        );
    }
);