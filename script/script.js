let showPokemon = 16;
let startPokemon = 0;


async function init() {
    await loadPokemon();
}


async function loadPokemon() {
    for (let i = startPokemon; i < showPokemon; i++) {
        const pokemonName = pokedex[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let [resp, err] = await resolve(fetch(url));
        let respAsJson = await resp.json();
        if (resp) {
            let pokemon = respAsJson;
            console.log(pokemon)
            renderPokemon(pokemon, i);
        }
        if (err) {
            console.error(err);
        }
    }
}


async function resolve(promise) {
    try {
        let response = await promise;
        return [response, null];
    } catch (e) {
        return [null, e];
    }
}


function renderPokemon(pokemon, i) {
    pokemonContainer.innerHTML += renderPokemonHtmlTemplate(pokemon, i);
    const pokemonType = document.getElementById(`pokemonType${i}`);
    pokemonType.innerHTML = '';
    for (let j = 0; j < pokemon['types'].length; j++) {
        const types = pokemon['types'][j];
        pokemonType.innerHTML += renderTypeHtmlTemplate(types, i);
        validTypes(pokemon, i);
    }
}


function validTypes(pokemon, i) {
    if (pokemon['types']['0']['type']['name'] === 'grass') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(0,128,1)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(9,97,6)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'fire') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(255, 69, 0)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(188,54,6)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'water') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(29,144,255)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(30,108,185)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'bug') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(165,41,42)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(124,37,37)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'flying') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = '';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = '';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'normal') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(128 128 128)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(97 96 96)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'poison') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(160,63,158)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(161,64,160)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'electric') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(255,216,111)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(252,224,103)';
        });
    }
    if (pokemon['types']['0']['type']['name'] === 'ground') {
        document.querySelector(`.pokemon-container${i}`).style.backgroundColor = 'rgb(224,184,103)';
        document.querySelectorAll(`.pokemon-type${i}`).forEach(pokemon => {
            pokemon.style.backgroundColor = 'rgb(224,200,120)';
        });
    }
}


function handleLoadPokemon(action) {
    if (action === 'more') {
        showPokemon = pokedex.length;
        startPokemon = 16;
        document.getElementById('loadMoreButton').style.display = 'none';
        document.getElementById('loadLessButton').style = '';
    } else {
        const pokemonContainer = document.getElementById('pokemonContainer');
        pokemonContainer.innerHTML = '';
        showPokemon = 16;
        startPokemon = 0;
        document.getElementById('loadMoreButton').style = '';
        document.getElementById('loadLessButton').style.display = 'none';
    }
    loadPokemon();
}