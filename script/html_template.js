function renderPokemonHtmlTemplate(pokemon, i, pokemonImage) {
    return /* html */ `
        <div onclick="renderExpendPokemon(${i})" class="pokemon-container${i} pokemon-container-style">
            <div class="name-id-container">
                <h2>${pokemon.name}</h2>
                <span>#${pokemon.id}</span>
            </div>
            <div class="type-img-container">
                <div id="pokemonTypeContainer${i}" class="type-container"></div>
                <img src="${pokemonImage}" alt="pokemon">
            </div>
        </div>
    `;
}

function renderTypeHtmlTemplate(type) {
    return /* html */ `
        <span>${type}</span>
    `;
}


function renderExpendPokemonHtmlTemplate(pokemon, i, pokemonImg) {
    return /* html */ `
        <svg onclick="switchExpandPokemon('left', ${i})" style="display: none;" class="arrow arrow-left" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 -960 960 960" width="70">
            <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
        <div class="big-screen-container">
            <div class="upper-container">
                <div class="description-container">
                    <h2>${pokemon.name}</h2>
                    <span class="upper-id">#${pokemon.id}</span>
                </div>
                <div id="expendPokemonTypeContainer${i}" class="big-type-container"></div>
                <img src="${pokemonImg}" alt="pokemon">
            </div>
            <div class="lower-container">
                <h3>Pokemon stats</h3>
                <div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
        <svg onclick="switchExpandPokemon('right', ${i})" style="display: none;" class="arrow arrow-right" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 -960 960 960" width="70">
            <path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
    `;
}