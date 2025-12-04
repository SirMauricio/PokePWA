
import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../services/pokemonService";

export default function usePokemonDetails(url) {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        const loadDetails = async () => {
            setLoading(true);
            const details = await fetchPokemonDetails(url);
            setPokemon(details);
            setLoading(false);
        };

        loadDetails();
    }, [url]);

    return { pokemon, loading };
}
