import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({
    pokemons,
    favoritos,
    onToggleFavorite,
    onSelect,
    typeColors
}) {
    return (
        <div className="pokemon-grid">
            {pokemons.map((p) => (
                <PokemonCard
                    key={p.id}
                    pokemon={p}
                    isFavorite={favoritos.some((f) => f.id === p.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelect}
                    typeColors={typeColors}
                />
            ))}
        </div>
    );
}



