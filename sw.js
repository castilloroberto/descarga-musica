self.addEventListener('install',e =>{


    e.waitUntil(
        caches.open("static").then(cache =>{

            return cache.addAll([
                "./", 
                "./css/index.css",
                "./js/api.js",
                "./img/logo192.png",
                "./img/logo512.png",
                "./img/loading512.png",
                "./img/gamer200.png",
                "./img/gamer512.png"
            ])

        })
    )


})

self.addEventListener('fetch',e =>{


    e.respondWith(
        caches.match(e.request)
        .then(res => {
            return res || fetch(e.request)
        })
    )

})