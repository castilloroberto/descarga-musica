
const container = document.querySelector('.container')
const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('inputSearch')

btnSearch.onclick = async ()=>{
    let url = inputSearch.value
    let data = {
        url
    }
    if (url.startsWith('https://www.youtube.com')) {
        if (url) {
        const response = await apirequest(
            'https://robert-descarga-musica-nodejs.herokuapp.com/info',
            'POST',
            JSON.stringify(data)
            )
            insertElement(response)
            
        } 
    }else{
        const response = await apirequest(
            'https://robert-descarga-musica-nodejs.herokuapp.com/search',
            'POST',
            JSON.stringify(data)
        )
        insertarItems(response.items)
    } 
        
}
async function fillItems() {
    const data = {
        url:'bad bunny'
    }
    const {items} = await apirequest(
        'https://robert-descarga-musica-nodejs.herokuapp.com/search',
        'POST',
        JSON.stringify(data)
    )
    insertarItems(items) 
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
function insertElement({title,videoId,video_url}) {
        insertarItems([{id:videoId,title,url:video_url}])
}

document.addEventListener('DOMContentLoaded',fillItems)


const songicon = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>`
const videoicon = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" class="svg-inline--fa fa-video fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path></svg>`


function insertarItems(items) {
    //e.id,e.title,e.url
    container.innerHTML = ''
    items.forEach(e => {
        const card = document.createElement('div')
        card.classList.add('card')

        const radiogroup = document.createElement('div')
        radiogroup.classList.add('radiogroup')
        // radios
        const radiovideo = document.createElement('input')
        const radioaudio = document.createElement('input')
        
        radiovideo.type = 'radio'
        radioaudio.type = 'radio'
        
        radiovideo.name = e.id
        radioaudio.name = e.id
        
        radiovideo.id = 'video-'+e.id
        radioaudio.id = 'audio-'+e.id
        
        const labelvideo = document.createElement('label')
        const labelaudio = document.createElement('label')
        
        labelaudio.textContent = 'Audio'
        labelvideo.textContent = 'Video'

        labelaudio.htmlFor = radioaudio.id
        labelvideo.htmlFor = radiovideo.id

        labelaudio.innerHTML += songicon
        labelvideo.innerHTML += videoicon

        radiogroup.append(radioaudio)
        radiogroup.append(radiovideo)
        radiogroup.append(labelvideo)
        radiogroup.append(labelaudio)


        labelaudio.addEventListener('click',()=>{
            labelaudio.classList.add('checked')
            labelvideo.classList.remove('checked')
        })
        labelvideo.addEventListener('click',()=>{
            labelvideo.classList.add('checked')
            labelaudio.classList.remove('checked')
        })
        
        // radios
        const btnsContainer = document.createElement('div')
        btnsContainer.classList.add('btns-container')
       
        const a = document.createElement('a')
        a.textContent = e.title
        const downbtn = document.createElement('button')
        downbtn.textContent ='Descargar'
       
        downbtn.classList.add('btn')
        downbtn.classList.add('downbtn')
        downbtn.addEventListener('click', async()=>{

            if (radioaudio.checked) {
                window.location.href = `https://robert-descarga-musica-nodejs.herokuapp.com/song?url=${e.url}`
                
            }else{
                window.location.href = `https://robert-descarga-musica-nodejs.herokuapp.com/download?url=${e.url}`

            }

        })
        
        const video = document.createElement('iframe')
        video.width = 295
        video.height = 166
        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        
        video.src = `https://www.youtube.com/embed/${e.id}`
        
        
        btnsContainer.append(a)
        radiogroup.append(downbtn)
        card.append(video)
        card.append(btnsContainer)
        card.append(radiogroup)
        
        //ultima parte 
        container.append(card)
    });
}







