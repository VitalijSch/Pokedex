async function loadPokemon() {
    for (let i = loadPokemonFrom; i < loadPokemonUntil; i++) {
        const id = i + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const [response, error] = await resolve(fetch(url));
        const pokemonData = await response.json();
        if (response) {
            pokedex.push(pokemonData);
            renderPokemonCard(i);
        }
        if (error) {
            console.error(error);
        }
    }
}


async function loadAllPokemon() {
    for (let i = loadPokemonFrom; i < allPokemon; i++) {
        const id = i + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const [response, error] = await resolve(fetch(url));
        const pokemonData = await response.json();
        if (response) {
            filteredPokedex.push(pokemonData);
        }
        if (error) {
            console.error(error);
        }
    }
}


function getPokemonImage(loadedPokemon, index) {
    const pokemonName = loadedPokemon.name;
    let pokemonIndex = pokedex.findIndex(pokemon => pokemon.name === pokemonName);
    if (pokemonIndex === -1) {
        pokemonIndex = index;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex + 1}.png`;
}


function getPokemonCries(loadedPokemon, index) {
    const pokemonName = loadedPokemon.name;
    let pokemonIndex = pokedex.findIndex(pokemon => pokemon.name === pokemonName);
    if (pokemonIndex === -1) {
        pokemonIndex = index;
    }
    return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonIndex + 1}.ogg`;
}


async function resolve(promise) {
    try {
        const response = await promise;
        return [response, null];
    } catch (error) {
        return [null, error];
    }
}
