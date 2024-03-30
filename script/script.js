let loadPokemonFrom = 0;
let loadPokemonUntil = 20;
let loadAllPokemonUntil = 1025;
let findFilteredPokemon = false;
let pokedex = [];
let allPokemon = [];
let filteredIndexes = [];
let firstTypeColor = null;
let secondTypeColor = null;


async function initialize() {
    await loadPokemon();
    await loadAllPokemon();
}


function renderPokemonCard(i) {
    const pokemon = getDisplayedPokemon(i);
    const pokemonContainer = document.getElementById('pokemonContainer');
    const pokemonName = capitalizeFirstLetter(pokemon.name);
    const pokemonImg = getPokemonImage(pokemon, i);
    pokemonContainer.innerHTML += renderPokemonHtmlTemplate(pokemonName, pokemon, i, pokemonImg);
    renderPokemonCardTypes(pokemon, i);
}


function renderExpendPokemonCard(i) {
    const pokemon = getDisplayedPokemon(i);
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const pokemonName = capitalizeFirstLetter(pokemon.name);
    const pokemonImg = getPokemonImage(pokemon, i);
    bigScreenContainer.innerHTML = renderExpendPokemonHtmlTemplate(pokemonName, pokemon, i, pokemonImg);
    renderExpandedPokemonTypes(pokemon, i);
    updateExpendPokemon();
    renderChartStats(i);
}


function renderPokemonCardTypes(pokemon, i) {
    const pokemonTypeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    pokemonTypeContainer.innerHTML = '';
    pokemon.types.forEach((type, j) => {
        const typeName = type.type.name;
        pokemonTypeContainer.innerHTML += `<span id="typeContainer${i}${j}">${typeName}</span>`;
        pokemonChangeColor('pokemon-container', 'typeContainer', i, j);
    });
    firstTypeColor = null;
    secondTypeColor = null;
}


function renderExpandedPokemonTypes(pokemon, i) {
    const expendPokemonTypeContainer = document.getElementById(`expendPokemonTypeContainer${i}`);
    expendPokemonTypeContainer.innerHTML = '';
    pokemon.types.forEach((type, j) => {
        const typeName = type.type.name;
        expendPokemonTypeContainer.innerHTML += `<span id="bigTypeContainer${i}${j}">${typeName}</span>`;
        pokemonChangeColor('upper-container', 'bigTypeContainer', i, j);
    });
    firstTypeColor = null;
    secondTypeColor = null;
}


function pokemonChangeColor(container, containerType, i, j) {
    const pokemonContainer = document.querySelector(`.${container}${i}`);
    const typeContainer = document.getElementById(`${containerType}${i}${j}`);
    let pokemon = getDisplayedPokemon(i);
    pokemonColors.forEach(color => {
        if (pokemon['types'][j]['type']['name'] === color.type) {
            if (firstTypeColor === null) {
                firstTypeColor = color.color;
                typeContainer.style.backgroundColor = color.color;
                pokemonContainer.style.background = firstTypeColor;
            } else {
                secondTypeColor = color.color;
                typeContainer.style.backgroundColor = color.color;
                pokemonContainer.style.background = `linear-gradient(to bottom, ${firstTypeColor}, ${secondTypeColor}`;
            }
        }
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


window.onscroll = handleScroll;


async function handleScroll() {
    const rect = loadMorePokemon.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    if (rect.top <= windowHeight) {
        await showMorePokemon();
    }
    window.onscroll = handleScroll;
}


async function showMorePokemon() {
    loadPokemonFrom = loadPokemonFrom + 20;
    if (loadPokemonUntil >= loadAllPokemonUntil) {
        loadPokemonUntil = loadAllPokemonUntil;
        document.getElementById('loadMorePokemonButton').style.display = 'none';
    } else {
        loadPokemonUntil = loadPokemonUntil + 20;
    }
    window.onscroll = null;
    await loadPokemon();
}


function getDisplayedPokemon(i) {
    return findFilteredPokemon ? allPokemon[i] : pokedex[i];
}


function playPokemonCry(i) {
    const loadedPokemon = getDisplayedPokemon(i);
    const audioElement = new Audio();
    const audioUrl = getPokemonCries(loadedPokemon, i);
    audioElement.src = audioUrl;
    audioElement.play();
}


function searchPokemon() {
    const searchPokemon = document.getElementById('searchPokemon');
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';
    if (searchPokemon.value.length > 2) {
        searchFilteredIndex(searchPokemon.value.toLowerCase());
    } else {
        window.onscroll = handleScroll;
        findFilteredPokemon = false;
        for (let i = 0; i < pokedex.length; i++) {
            renderPokemonCard(i);
        }
    }
};


function searchFilteredIndex(searchKeyword) {
    window.onscroll = null;
    filteredIndexes = [];
    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemon[i].name.toLowerCase().startsWith(searchKeyword)) {
            findFilteredPokemon = true;
            filteredIndexes.push(i);
            renderPokemonCard(i);
        }
    }
}


function switchExpandPokemon(action, i) {
    if (findFilteredPokemon) {
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
        i = (i >= loadPokemonUntil - 1) ? 0 : i + 1;
    }
    renderExpendPokemonCard(i);
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function idNumberWithZero(i) {
    const numberWithZero = ['#000', '#00', '#0', '#'];
    const index = i + 1;
    if (index <= 9) return numberWithZero[0];
    if (index <= 99) return numberWithZero[1];
    if (index <= 999) return numberWithZero[2];
    return numberWithZero[3];
}