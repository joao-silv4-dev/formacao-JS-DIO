let pokeAPIURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";
let limit =  9;
let offset =  0;

/*
<div class="card">
    <div class="cardLeft">
        <span class="namePokemon">
            Bulbasaur
        </span>
        <div class="skillsDiv">
            <span class="skill">grass</span>
            <span class="skill">poison</span>
        </div>
    </div>
    <div class="cardRight">
        <span class="numberPokemon">#001</span>
        <img src="" alt="" class="imgPokemon">
    </div>
</div>
*/

function addPokemonViaURL(pokemon){
    fetch(pokemon.url)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        let pokemonOBJ = {
            numberP: response.id,
            name: response.name,
            frontImage: response.sprites.front_default,
            type: response.types[0].type.name
        };
        return pokemonOBJ;
    })
    .then(response => {
        convertPokemonToCard(response)
    })
    .catch(e => console.log(e))
}

function convertPokemonToCard(pokemon){
    let pokemonHTML = `<div class="card ${pokemon.type}">
    <div class="cardLeft">
        <span class="namePokemon">
            ${pokemon.name}
        </span>
        <div class="skillsDiv">
            <span class="skill ${pokemon.type}">${pokemon.type}</span>
        </div>
    </div>
    <div class="cardRight">
        <span class="numberPokemon">#${pokemon.numberP}</span>
        <img src="${pokemon.frontImage}" alt="${pokemon.name}" class="imgPokemon">
    </div>
</div>`;
    document.querySelector(".cardsPokemons").innerHTML += pokemonHTML;
    
}

function carregarPaginaPokemon(limit, offset){
    document.querySelector(".cardsPokemons").innerHTML = "";

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(json1 => json1.json())
        .then(json2 => json2.results)
        .then(response => {
            for (let i = 0; i < response.length; i++){
                addPokemonViaURL(response[i]);
            }
        })
        .catch(e => console.log(e))
    
}

function proximaPagina(){
    offset += 5;
    carregarPaginaPokemon(limit, offset)
}

function backPagina(){
    if ( !((offset-5) < 0) ) {
        offset -= 5;
        carregarPaginaPokemon(limit,offset)
    } else {
        console.log("É a primeira página!")
    }
}

document.querySelector(".btnBackPage").addEventListener("click", backPagina)
document.querySelector(".btnNextPage").addEventListener("click", proximaPagina)


carregarPaginaPokemon(limit, offset)