import { askSomething } from "./functions.js";

const instalBtn = document.querySelector('.btninstall')
const cancelBtn = document.querySelector('.btncancel')
cancelBtn.onclick = verinstallPrompt
const installlpromp = document.querySelector('.install')

let install = JSON.parse(localStorage.getItem('install'))

function verinstallPrompt(){
    
        installlpromp.classList.toggle('visible')
        askSomething()
    
}


console.log('install:',install);


let dererredPromp
window.addEventListener('beforeinstallprompt', e =>{
    e.preventDefault()
    
    dererredPromp = e
    if (install == null)
        verinstallPrompt()
    
    console.log('el evento de beforeinstallPromp se ejecuto',dererredPromp)
})


instalBtn.addEventListener('click',installAPP)
async function installAPP(){

   
    dererredPromp.prompt()
    const {outcome} = await dererredPromp.userChoice
    console.log('user choice',outcome);
    dererredPromp = null
    verinstallPrompt()
    
    // if (install == null ) {
    
    //     if (confirm('HOLA')) {
    //         dererredPromp.prompt()
    //         const {outcome} = await dererredPromp.userChoice
    //         console.log('user choice',outcome);
    //         dererredPromp = null
    
    //     }
    // }
}



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
