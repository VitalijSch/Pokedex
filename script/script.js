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
    for (let i = startsFromPokemon; i < endsAtPokemon; i++) {
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
        const pokemonTypen = pokemon['name'];
        const index = pokedex.findIndex(pokemon => pokemon['name'] === pokemonTypen);
        if (index === -1) {
            index = i;
        }
        let pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`;
        pokemonContainer.innerHTML += renderPokemonHtmlTemplate(pokemon, i, pokemonImg);
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


async function loadMorePokemon() {
    startsFromPokemon = startsFromPokemon + 20;
    if (endsAtPokemon >= allPokemon) {
        endsAtPokemon = allPokemon;
        document.getElementById('loadMoreButton').style.display = 'none';
    } else {
        endsAtPokemon = endsAtPokemon + 20;
    }
    await loadAllPokemon();
    renderPokemon();
}


function renderChart(i) {
    const ctx = document.getElementById('myChart');
    const stats = pokedex[i]['stats'];
    const stat = stats.map(stat => stat['base_stat']);
    const statNames = stats.map(stat => stat['stat']['name'])
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statNames,
            datasets: [{
                data: stat,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false // Legende ausblenden
                }
            }
        }

    });
}


function showPokemon(i) {
    const bigScreenContainer = document.getElementById('bigScreenContainer');
    const closeButton = document.querySelector('.close-button');
    closeButton.style = '';
    let pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`;
    let pokemon = pokedex[i];
    bigScreenContainer.innerHTML = renderBigScreenPokemonHtmlTemplate(pokemon, i, pokemonImg);
    document.querySelectorAll('.arrow').forEach(element => {
        element.style = '';
    });
    const pokemonTypeContainer = document.getElementById(`pokemonBigType${i}`);
    for (let j = 0; j < pokemon['types'].length; j++) {
        const types = pokemon['types'][j];
        pokemonTypeContainer.innerHTML += renderTypeHtmlTemplate(types);
        changeTypeColor(pokemon, i);
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
    changeTypeColor(pokemon, i);
}


function closeShowPokemon(event) {
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


function switchPokemon(action, i) {
    if (action === 'left') {
        i = i === 0 ? endsAtPokemon - 1 : i - 1;
    } else {
        i = i + 1 >= endsAtPokemon ? 0 : i + 1;
    }
    showPokemon(i);
}