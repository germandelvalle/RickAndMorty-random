const $container = document.getElementById('container')


const Card = async ()=>{ // funcion que crea Card con los datos del personaje
        
    let character = await TraerPersonaje()
    const view =  `
        <div class="card border border-dark" style="width: 18rem;">
            <img src="${character.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column justify-content-between">
                <h2 class="card-title text-center">${character.name}</h2>
                <h5 class="card-title text-warning ">Gender: <p class="d-inline text-dark m-0">${character.gender}</p></h5> 
                <h5 class="card-title text-warning ">Specie: <p class="d-inline text-dark m-0">${character.species}</p></h5>
                <h5 class="card-title text-warning ">Status: <p class="d-inline text-dark m-0">${character.status}</p></h5>
                <h5 class="card-title text-warning ">Location: <p class="d-inline text-dark m-0">${character.location.name}</p></h5>
                <h5 class="card-title text-warning ">Episodes: <p class="d-inline text-dark m-0">${character.episode.length}</p></h5>
                
                <button id="sortear" class="btn btn-success">Raffle</button>
            </div>
        </div>
        `
    return view
}

    const getRandom = ()=> { //funcion de numero aleatorio para traer personajes aleatorios
        return Math.floor(Math.random() * (592 - 1)) + 1;
    }

    const TraerPersonaje = async()=>{ //funcion de peticion a la api
        try{
            const random = getRandom()
            const response = await fetch(`https://rickandmortyapi.com/api/character/${random}`)
            const data = await response.json()
            console.log(data)
            return data
        }
        catch(error){
            console.log('ocurrio un error de peticion')
            
        }

    }


const Home = async ()=>{

    
    $container.innerHTML=`
    <section class=" d-flex flex-column align-items-center mt-5">
        <img src="./images/9OiY-rmlogo.png" class="logo"></img>
        <h4 class="mt-5 text-warning">Get random character!</h4>
        <button id="empezar" class="btn btn-success btn-lg rounded-circle mt-5">Start</button>
    </section>`

    //creo boton inicial
    const btnEmpezar = document.getElementById('empezar')

    //funcion de comienzo
    const empezar = async()=>{ 
        $container.innerHTML=await Card() //ingreso html al contenedor
        const btnSortear = document.getElementById('sortear')//traigo del dom boton del sorteo
        btnSortear.addEventListener('click',()=>{
            empezar() //evento que actualiza la informacion del personaje
        })
    }
    //evento click de boton empezar
    btnEmpezar.addEventListener('click',()=>{
    empezar()
    btnEmpezar.classList.add('d-none')//desaparece cuando es clickeado

    })  

    
   

    
    
}

const About = ()=>{
    const view = 
    `
    <section class="text-warning">
        <d>
            <h1 class="text-light">
            About the page
            </h1>
            <br/>
            <p>
                This SPA (single page application) is created to reinforce my knowledge of web development.
                <br/>
                <h5>Technologies:</h5>
                <br/>
                <ul>
                    <li>HTML5</li>
                    <li>CSS</li>
                    <li>Bootstrap</li>
                    <li>Vanilla JavaScript</li>
                </ul>
                
                The information is extracted from the API <a href="https://rickandmortyapi.com/">RickAndMortyAPI</a>
            </p>
        </d>
        <br/>
        <br/>
        <d>
            <h1 class="text-light">
                About the Author
            </h1>
            <br/>    
            <p>
                Hello !!!<br/>
                how are you?<br/>
                My name is German Del Valle and I am a frontend developer (or so I try haha).<br/>
                If you are interested in contacting me, do it, I will gladly talk to you.
            </p>
            
        </d>
    </section>
    `
    $container.innerHTML=view
}

const Error404 = ()=>{
    const view = `
        <div>
            <h1>
                Error 404
            </h1>
            <h3>
            Page not found
            </h3>
        </div>
    `
    return view
}



const Router = (route)=>{
    
    // switch(route){
    //     case '#/': return Home()
    //     break
    //     case '#/about': return About()
    //     break
    //     default: return Error404()
    //     break
    // }
    if(route==='#/'){
        return Home()
    }
    else if(route==='#/about'){
        return About()
    
    }
    else{
        return Error404()
    }
}

Home();

Router(window.location.hash)

window.addEventListener('hashchange',()=>{
    Router(window.location.hash)
})

