let loadPokemonFrom = 0;
let loadPokemonUntil = 20;
let allPokemon = 1025;
let pokedex = [];
let filteredPokedex = [];


async function init() {
    await loadPokemon();
}


async function loadPokemon() {
    for (let i = loadPokemonFrom; i < loadPokemonUntil; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let [resp, err] = await resolve(fetch(url));
        let respAsJson = await resp.json();
        if (resp) {
            pokedex.push(respAsJson);
            renderPokemon(i);
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


function renderPokemon(i) {
    let loadedPokemon = filteredPokedex.length === 0 ? pokedex[i] : filteredPokedex[i];
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML += renderPokemonHtmlTemplate(loadedPokemon, i, getPokemonImage(loadedPokemon, i));
    const pokemonTypeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    pokemonTypeContainer.innerHTML = '';
    for (let j = 0; j < loadedPokemon['types'].length; j++) {
        const type = loadedPokemon['types'][j]['type']['name'];
        pokemonTypeContainer.innerHTML += renderTypeHtmlTemplate(type);
        pokemonTypeColor(loadedPokemon, i);
    }
}


function renderExpendPokemon(i) {
    let loadedPokemon = filteredPokedex.length === 0 ? pokedex[i] : filteredPokedex[i];
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const closeButton = document.querySelector('.close-button');
    closeButton.style = '';
    bigScreenContainer.innerHTML = renderExpendPokemonHtmlTemplate(loadedPokemon, i, getPokemonImage(loadedPokemon, i));
    document.querySelectorAll('.arrow').forEach(element => {
        element.style = '';
    });
    const expendPokemonTypeContainer = document.getElementById(`expendPokemonTypeContainer${i}`);
    expendPokemonTypeContainer.innerHTML = '';
    for (let j = 0; j < loadedPokemon['types'].length; j++) {
        const type = loadedPokemon['types'][j]['type']['name'];
        expendPokemonTypeContainer.innerHTML += renderTypeHtmlTemplate(type);
        pokemonTypeColor(loadedPokemon, i);
    }
    const upperContainer = document.querySelector('.upper-container');
        const pokemonType = pokedex[i]['types']['0']['type']['name'];
        pokemonColors.forEach(color => {
            if (pokemonType === color.type) {
                upperContainer.style.backgroundColor = color.color;
            };
        });
    bigScreenContainer.style = '';
    document.body.style.overflowY = 'hidden';
    renderChart(i);
    pokemonTypeColor(loadedPokemon, i);
}


function getPokemonImage(loadedPokemon, i) {
    let pokemonName = loadedPokemon['name'];
    let index = pokedex.findIndex(pokemon => pokemon['name'] === pokemonName);
    if (index === -1) {
        index = i;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`;
}


function toggleInputField() {
    const searchPokemon = document.getElementById('searchPokemon');
    searchPokemon.style = searchPokemon.style.display === 'none' ? '' : 'display: none;';
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


async function searchPokemon() {
    const searchPokemon = document.getElementById('searchPokemon');
    const pokemonContainer = document.getElementById('pokemonContainer');
    const loadMorePokemonButton = document.getElementById('loadMorePokemonButton');
    pokemonContainer.innerHTML = '';
    if (searchPokemon.value.length > 3) {
        filteredPokedex = pokedex.filter(pokemon => {
            return pokemon.name.startsWith(searchPokemon.value.toLowerCase());
        });
        filteredPokedex = filteredPokedex.slice(0, 10);
        loadPokemonUntil = filteredPokedex.length;
        loadMorePokemonButton.style.display = 'none';
    } else {
        filteredPokedex = [];
        // loadPokemonFrom = 0;
        // loadPokemonUntil = 20;
        loadMorePokemonButton.style = '';
    }
    await loadPokemon();
};


function pokemonTypeColor(loadedPokemon, i) {
    const pokemonTypeName = loadedPokemon['types']['0']['type']['name'];
    const pokemonContainer = document.querySelector(`.pokemon-container${i}`);
    pokemonColors.forEach(pokemon => {
        if (pokemonTypeName === pokemon.type) {
            pokemonContainer.style.backgroundColor = pokemon.color;
        }
    });
}


async function loadMorePokemon() {
    loadPokemonFrom = loadPokemonFrom + 20;
    if (loadPokemonUntil >= allPokemon) {
        loadPokemonUntil = allPokemon;
        document.getElementById('loadMorePokemonButton').style.display = 'none';
    } else {
        loadPokemonUntil = loadPokemonUntil + 20;
    }
    await loadPokemon();
}


function closeExpandPokemon(event) {
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const closeButton = document.querySelector('.close-button');
    if (event.target === bigScreenContainer || event.target === closeButton) {
        bigScreenContainer.style.display = 'none';
        closeButton.style.display = 'none';
        document.body.style = '';
        document.querySelectorAll('.arrow').forEach(element => {
            element.style.display = 'none';
        });
    }
}


function switchExpandPokemon(action, i) {
    if (action === 'left') {
        i = i === 0 ? loadPokemonUntil - 1 : i - 1;
    } else {
        i = i + 1 >= loadPokemonUntil ? 0 : i + 1;
    }
    renderExpendPokemon(i);
}