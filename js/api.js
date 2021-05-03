
const container = document.querySelector('.container')
const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('inputSearch')

btnSearch.onclick = async ()=>{
    let url = inputSearch.value
    let data = {
        url
    }
    if (url.includes('https')) {
        console.log('es un link');
        if (url) {
        const response = await apirequest(
            'http://localhost:3000/info',
            'POST',
            JSON.stringify(data)
            )
            console.log(response);
            insertElement(response)
            
        } else {
            console.log('Input vacio');
        }
    }else{
        console.log('es una busqueda');
        const response = await apirequest(
            'http://localhost:3000/search',
            'POST',
            JSON.stringify(data)
        )
        console.log(response);
    } 
        
}
    
async function apirequest(url,method,body) {

    // window.location.href = apiurl    
    const data = await fetch(url,{
        method,
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body
        
    })
    
    return data.json()
    
}
function insertElement({title,img,video_url}) {
        const card = document.createElement('div')
        card.classList.add('card')
        const verbtn = document.createElement('button')
        verbtn.textContent ='Reproducir'
        const downbtn = document.createElement('button')
        downbtn.textContent ='Descargar'
        verbtn.classList.add('btn')
        verbtn.classList.add('verbtn')
        downbtn.classList.add('btn')
        downbtn.classList.add('downbtn')
        const imgelemet = document.createElement('img')
        const link = video_url
        const a = document.createElement('a')
        a.href = link
        a.textContent = title
        
        imgelemet.src = img
        card.append(imgelemet)
        card.append(a)
        card.append(downbtn)
        card.append(verbtn)
        
        //ultima parte 
        container.append(card)
}

// document.addEventListener('DOMContentLoaded',makeRequest())



function insertarItems(items) {
    items.forEach(e => {
        const card = document.createElement('div')
        const verbtn = document.createElement('button')
        verbtn.textContent ='Reproducir'
        const downbtn = document.createElement('button')
        downbtn.textContent ='Descargar'
        verbtn.classList.add('btn')
        verbtn.classList.add('verbtn')
        downbtn.classList.add('btn')
        downbtn.classList.add('downbtn')
        card.classList.add('card')
        const img = document.createElement('img')
        const link = e.id.videoId
        const a = document.createElement('a')
        a.href = `https://www.youtube.com/watch?v=${link}`
        a.textContent = e.snippet.title
        
        img.src = e.snippet.thumbnails.medium.url
        card.append(img)
        card.append(a)
        card.append(downbtn)
        card.append(verbtn)
        
        //ultima parte 
        container.append(card)
    });
}






