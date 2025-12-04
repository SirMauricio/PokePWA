import { useState, useEffect } from "react";

const limit = 20;

export function usePokemonList(offset) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await res.json();

                const detailedPokemons = await Promise.all(
                    data.results.map(async (p) => {
                        const res = await fetch(p.url);
                        const details = await res.json();
                        return {
                            id: details.id,
                            name: details.name,
                            type: details.types[0].type.name,
                            types: details.types.map((t) => t.type.name),
                            sprite: details.sprites.other["official-artwork"].front_default,
                            stats: details.stats,
                            abilities: details.abilities.map((a) => a.ability.name),
                        };
                    })
                );
                setPokemons(detailedPokemons);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemons();
    }, [offset]);

    return { pokemons, loading };
}



