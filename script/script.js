let loadPokemonFrom = 0;
let loadPokemonUntil = 20;
let allPokemon = 1025;
let pokedex = [];
let filteredPokedex = [];
let filteredIndexes = [];


async function initialize() {
    await loadPokemon();
    await loadAllPokemon();
}


function renderPokemonCard(i) {
    const pokemon = filteredIndexes.length === 0 ? pokedex[i] : filteredPokedex[i];
    const pokemonContainer = document.getElementById('pokemonContainer');
    const pokemonName = capitalizeFirstLetter(pokemon.name);
    const pokemonImg = getPokemonImage(pokemon, i);
    pokemonContainer.innerHTML += renderPokemonHtmlTemplate(pokemonName, pokemon, i, pokemonImg);
    renderPokemonCardTypes(pokemon, i);
}


function renderPokemonCardTypes(pokemon, i) {
    const pokemonTypeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    pokemonTypeContainer.innerHTML = '';
    pokemon.types.forEach((type, j) => {
        const typeName = type.type.name;
        pokemonTypeContainer.innerHTML += `<span id="typeContainer${i}${j}">${typeName}</span>`;
        pokemonTypeColor('pokemon-container', 'typeContainer', i, j);
    });
}


function renderExpendPokemonCard(i) {
    const pokemon = filteredIndexes.length === 0 ? pokedex[i] : filteredPokedex[i];
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const pokemonName = capitalizeFirstLetter(pokemon.name);
    const pokemonImg = getPokemonImage(pokemon, i);
    bigScreenContainer.innerHTML = renderExpendPokemonHtmlTemplate(pokemonName, pokemon, i, pokemonImg);
    renderExpandedPokemonTypes(pokemon, i);
    updateExpendPokemon();
    renderChart(i);
}


function renderExpandedPokemonTypes(pokemon, i) {
    const expendPokemonTypeContainer = document.getElementById(`expendPokemonTypeContainer${i}`);
    expendPokemonTypeContainer.innerHTML = '';
    pokemon.types.forEach((type, j) => {
        const typeName = type.type.name;
        expendPokemonTypeContainer.innerHTML += `<span id="bigTypeContainer${i}${j}">${typeName}</span>`;
        pokemonTypeColor('upper-container', 'bigTypeContainer', i, j);
    });
}


function updateExpendPokemon() {
    const closeButton = document.querySelector('.close-button');
    closeButton.style = '';
    bigScreenContainer.style = '';
    document.body.style.overflowY = 'hidden';
    document.querySelectorAll('.arrow').forEach(element => {
        element.style = '';
    });
}


function playPokemonCry(i) {
    let loadedPokemon = filteredIndexes.length === 0 ? pokedex[i] : filteredPokedex[i];
    const audioElement = new Audio();
    const audioUrl = getPokemonCries(loadedPokemon, i);
    audioElement.src = audioUrl;
    audioElement.play();
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function searchPokemon() {
    const searchPokemon = document.getElementById('searchPokemon');
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';
    if (searchPokemon.value.length > 2) {
        searchFilteredIndex(searchPokemon.value.toLowerCase());
    } else {
        window.onscroll = handleScroll;
        filteredIndexes = [];
        for (let i = 0; i < pokedex.length; i++) {
            renderPokemonCard(i);
        }
    }
};


function searchFilteredIndex(searchKeyword) {
    window.onscroll = null;
    filteredIndexes = [];
    for (let i = 0; i < filteredPokedex.length; i++) {
        if (filteredPokedex[i].name.toLowerCase().startsWith(searchKeyword)) {
            filteredIndexes.push(i);
        }
    }
    filteredIndexes.slice(0, 10).forEach(index => {
        renderPokemonCard(index);
    });
}


function pokemonTypeColor(container, containerType, i, j) {
    const pokemonContainer = document.querySelector(`.${container}${i}`);
    const typeContainer = document.getElementById(`${containerType}${i}${j}`);
    const pokemonTypeName = filteredIndexes.length === 0 ? pokedex[i]['types']['0']['type']['name'] : filteredPokedex[i]['types']['0']['type']['name'];
    const pokemonType = filteredIndexes.length === 0 ? pokedex[i]['types'] : filteredPokedex[i]['types'];
    pokemonColors.forEach(pokemon => {
        if (pokemonTypeName === pokemon.type) {
            pokemonContainer.style.backgroundColor = pokemon.color;
        }
        if (pokemonType[j].type.name === pokemon.type) {
            typeContainer.style.backgroundColor = pokemon.color;
        }
    });
}


function closeExpandPokemon(event) {
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const closeButton = document.querySelector('.close-button');
    if (event.target === bigScreenContainer || event.target === closeButton) {
        bigScreenContainer.style.display = 'none';
        closeButton.style.display = 'none';
        document.body.style = '';
        document.querySelectorAll('.arrow').forEach(arrow => {
            arrow.style.display = 'none';
        });
    }
}


function switchExpandPokemon(action, i) {
    if (filteredIndexes.length !== 0) {
        showNextOrPreviousFilteredPokemon(action, i);
    } else {
        showNextOrPreviousPokemon(action, i);
    }
}


function showNextOrPreviousFilteredPokemon(action, i) {
    let currentIndex = filteredIndexes.findIndex(index => index === i);
    let index;
    if (action === 'left') {
        currentIndex = currentIndex - 1;
        index = currentIndex < 0 ? filteredIndexes[filteredIndexes.length - 1] : filteredIndexes[currentIndex];
    } else {
        currentIndex = currentIndex + 1;
        index = currentIndex >= filteredIndexes.length ? filteredIndexes[0] : filteredIndexes[currentIndex];
    }
    renderExpendPokemonCard(index);
}


function showNextOrPreviousPokemon(action, i) {
    if (action === 'left') {
        i = (i === 0) ? loadPokemonUntil - 1 : i - 1;
    } else {
        i = (i + 1 >= loadPokemonUntil) ? 0 : i + 1;
    }
    renderExpendPokemonCard(i);
}


async function handleScroll() {
    const loadMorePokemon = document.getElementById('loadMorePokemon');
    const rect = loadMorePokemon.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    if (rect.top <= windowHeight) {
        loadPokemonFrom = loadPokemonFrom + 20;
        if (loadPokemonUntil >= allPokemon) {
            loadPokemonUntil = allPokemon;
            document.getElementById('loadMorePokemonButton').style.display = 'none';
        } else {
            loadPokemonUntil = loadPokemonUntil + 20;
        }
        window.onscroll = null;
        await loadPokemon();
    }
    window.onscroll = handleScroll;
}


window.onscroll = handleScroll;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}