
let dererredPromp
window.addEventListener('beforeinstallprompt', e =>{
    e.preventDefault()
    
    dererredPromp = e
    if (install == null)
        verinstallPrompt()
    
    console.log('el evento de beforeinstallPromp se ejecuto',dererredPromp)
})






if (navigator.serviceWorker) {
    
    navigator.serviceWorker.register("sw.js")
    .then( regis =>{
        console.log("SW Registrado!!");
        console.log(regis);
    })
    .catch(err =>{
        console.log("Ha habido un problema al intentar crear el service worker",err);
    })

    console.log('puedes instalar esta app');

}else{
    alert("No podras instalar esta app dado que tu Navegador no soporta las aplicaciones progresivas pero, podras usar esta app sin problemas dentro del navegador")
    console.log("No podras instalar esta app dado que tu Navegador no soporta las aplicaciones progresivas pero, podras usar esta app sin problemas dentro del navegador")
}
