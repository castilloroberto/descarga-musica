


if ("serviceWorker" in navigator) {
    
    navigator.serviceWorker.register("sw.js")
    .then( regis =>{
        console.log("SW Registrado!!");
        console.log(regis);
    })
    .catch(err =>{
        console.log("Ha habido un problema al intentar crear el service worker",err);
    })


}else{
    alert("No podras instalar esta app dado que tu Navegador no soporta las aplicaciones progresivas pero, podras usar esta app sin problemas dentro del navegador")
}