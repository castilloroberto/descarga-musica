self.addEventListener('install',e =>{

    let promise = caches.open("static").then(cache =>
         cache.addAll([
            "./index.html", 
            "./css/index.css",
            "./js/api.js",
            "./img/logo144.png",
            "./img/logo192.png",
            "./img/nointernet512.png"
           
        ])
    ) 
    e.waitUntil(promise)


})

self.addEventListener('fetch',e =>{


    e.respondWith(
        caches.match(e.request)
        .then(res =>
             res || fetch(e.request)
        )
    )

})

// "./img/logo512.png",
// "./img/loading512.png",
// "./img/gamer200.png",
// "./img/gamer512.png"