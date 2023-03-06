const pokemonData = require("../data/pokedex.json");

async function getPokemonData() {
    return new Promise((resolve) => { resolve(pokemonData); });
}

export default getPokemonData;
