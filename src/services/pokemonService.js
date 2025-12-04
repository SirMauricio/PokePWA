// src/services/pokemonService.js

const API_BASE = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemonList(limit = 20, offset = 0) {
    const res = await fetch(`${API_BASE}?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    return data.results;
}

export async function fetchPokemonDetails(url) {
    const res = await fetch(url);
    const details = await res.json();

    return {
        id: details.id,
        name: details.name,
        types: details.types.map((t) => t.type.name),
        mainType: details.types[0].type.name,
        sprite: details.sprites.other["official-artwork"].front_default,
        stats: details.stats,
        abilities: details.abilities.map((a) => a.ability.name),
    };
}
