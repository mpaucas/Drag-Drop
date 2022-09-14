const CARDS = 10;

//Peticion de polemones API

for (var i = 1; i <= CARDS; i++) {
    let id = getRandomId(150);
    searchPokemonById(id);
}

function getRandomId(max){
    return Math.floor(Math.random()*max)+1;
}

let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');
let pokemonSearched = [];
let pokemonNames = [];

async function searchPokemonById(id) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/');
    const data = await res.json();
    pokemonSearched.push(data);
    pokemonNames.push(data.name);

    pokemonNames = pokemonNames.sort(() => Math.random()-0.5);

    draggableElements.innerHTML = ' ';
    droppableElements.innerHTML = ' ';

    // Dibujando Pokemones
    pokemonSearched.forEach(pokemon => {
        // console.log(pokemon.sprites.other['official-artwork']);
        draggableElements.innerHTML += `
            <div class="pokemon">
                <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
            </div>`;
    })

    //Insertando nombres de los pokemones
    pokemonNames.forEach(pokenames => {
        droppableElements.innerHTML += `
            <div class="names">
                ${pokenames}
            </div>`;
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons]

    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.names');
    let wrongMsg = document.querySelector('.wrong');
    let points = 0;
    names = [...names]

    names.forEach(name => {

        name.addEventListener('dragover', event => {
            event.preventDefault();
        })

        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`);

            if(event.target.innerText === draggableElementData){
                points++;
                event.target.innerHTML = '';
                event.target.appendChild(pokemonElement);
                wrongMsg.innerText = ''

                if(points == CARDS){
                    draggableElements.innerHTML = `
                    <div>
                        <p class="winner">Ganaste!!!!</p>
                        <button class="btn_winner" onclick="location.reload()" >Volver a jugar</button>
                    </div>`;
                }

            }else{
                wrongMsg.innerText = 'Ups!'
            }
        })
    })
}
