import React from "react";

export default function PokemonModal({ pokemon, onClose, typeColors }) {
    if (!pokemon) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div
                className="modal-content"
                style={{
                    background: `linear-gradient(145deg, ${typeColors[pokemon.type]} 60%, #fff 100%)`,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>
                <img src={pokemon.sprite} alt={pokemon.name} className="modal-img" />
                <h2>{pokemon.name}</h2>
                <p className="pokemon-id">#{pokemon.id}</p>

                <div className="modal-section">
                    <h3>Tipo</h3>
                    <div className="type-list">
                        {pokemon.types.map((t) => (
                            <span key={t} className="pokemon-type">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="modal-section">
                    <h3>Estadísticas</h3>
                    <ul>
                        {pokemon.stats.map((s) => (
                            <li key={s.stat.name}>
                                {s.stat.name.toUpperCase()}: {s.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="modal-section">
                    <h3>Habilidades</h3>
                    <ul>
                        {pokemon.abilities.map((a) => (
                            <li key={a}>{a}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}



