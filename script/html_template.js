function renderPokemonHtmlTemplate(pokemon, i) {
    return /* html */ `
        <div class="pokemon-container${i} pokemon-container-style">
            <div class="name-id-container">
                <h2>${pokemon.name}</h2>
                <span>#${pokemon.id}</span>
            </div>
            <div class="type-img-container">
                <div id="pokemonType${i}" class="type-container">${pokemon['types']['0']['type']['name']}</div>
                <img src="${pokemon['sprites']['front_default']}" alt="pokemon">
            </div>
        </div>
    `;
}


function renderTypeHtmlTemplate(types, i) {
    console.log(types['type']['name'])
    return /* html */ `
        <span class="pokemon-type${i}">${types['type']['name']}</div>
    `;
}