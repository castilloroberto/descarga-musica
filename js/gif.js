


const container = document.querySelector('.container')
const inputSearch = document.querySelector('input')
const btn = document.querySelector('button')


const list = []


inputSearch.addEventListener('keyup',e =>{
    let {key,code} = e
    const body = {
        key,
        code
    }
    list.push(body)
})

btn.onclick = async ()=>{
    const body = {
        list
    }
    console.log(body);
    let phoneUrl = 'http://192.168.0.24:4000'
    let url = 'http://localhost:4000'
    const response = await makeRequest(phoneUrl,'POST',JSON.stringify(body))
    console.log(response);
    listar(response.list)
}

async function makeRequest(url,method,body) {
    const response = await fetch(url,{
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

    return response.json()
}

function listar(items) {
    container.innerHTML = ''
    items.forEach(e => {
        const caja = document.createElement('div')
        caja.classList.add('card')
        const code = document.createElement('span')
        const key = document.createElement('span')

        code.textContent = 'Code:'+e.code
        key.textContent = 'Key:'+e.key

        caja.append(code)
        caja.append(key)

        container.append(caja)
    });
}