let startsFromPokemon = 0;
let endsAtPokemon = 20;
let allPokemon = 1025;
let pokedex = [];
let filteredPokemon = [];


async function init() {
    await loadAllPokemon();
    renderPokemon();
}


function showInputField() {
    const searchPokemon = document.getElementById('searchPokemon');
    if (searchPokemon.style.display === 'none') {
        searchPokemon.style = '';
    } else {
        searchPokemon.style.display = 'none'
    }
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function showSearchPokemon() {
    const searchPokemon = document.getElementById('searchPokemon');
    const pokemonContainer = document.getElementById('pokemonContainer');
    const loadMoreButton = document.getElementById('loadMoreButton');
    pokemonContainer.innerHTML = '';
    if (searchPokemon.value.length > 3) {
        filteredPokemon = pokedex.filter(pokemon => {
            return pokemon.name.startsWith(searchPokemon.value.toLowerCase());
        });
        filteredPokemon = filteredPokemon.slice(0, 10);
        if (searchPokemon.value === '') {
            filteredPokemon = [];
            startsFromPokemon = 0;
            endsAtPokemon = 20;
            loadMoreButton.style = '';
        } else {
            startsFromPokemon = 0;
            endsAtPokemon = filteredPokemon.length;
            loadMoreButton.style.display = 'none';
        }
    } else {
        filteredPokemon = [];
        startsFromPokemon = 0;
        endsAtPokemon = 20;
        loadMoreButton.style = '';
    }
    renderPokemon();
};


async function loadAllPokemon() {
    for (let i = 0; i < allPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let [resp, err] = await resolve(fetch(url));
        let respAsJson = await resp.json();
        if (resp) {
            pokedex.push(respAsJson);
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


function renderPokemon() {
    const pokemonContainer = document.getElementById('pokemonContainer');
    for (let i = startsFromPokemon; i < endsAtPokemon; i++) {
        let pokemon = filteredPokemon.length === 0 ? pokedex[i] : filteredPokemon[i];
        pokemonContainer.innerHTML += renderPokemonHtmlTemplate(pokemon, i);
        const pokemonType = document.getElementById(`pokemonType${i}`);
        pokemonType.innerHTML = '';
        for (let j = 0; j < pokemon['types'].length; j++) {
            const types = pokemon['types'][j];
            pokemonType.innerHTML += renderTypeHtmlTemplate(types);
            changeTypeColor(pokemon, i);
        }
    }
}


function changeTypeColor(pokemon, i) {
    const pokemonType = pokemon['types']['0']['type']['name'];
    const pokemonContainer = document.querySelector(`.pokemon-container${i}`);
    pokemonColors.forEach(pokemon => {
        if (pokemonType === pokemon.type) {
            pokemonContainer.style.backgroundColor = pokemon.color;
        }
    });
}


function loadMorePokemon() {
    startsFromPokemon = startsFromPokemon + 20;
    if (endsAtPokemon >= allPokemon) {
        endsAtPokemon = allPokemon;
        document.getElementById('loadMoreButton').style.display = 'none';
    } else {
        endsAtPokemon = endsAtPokemon + 20;
    }
    renderPokemon();
}