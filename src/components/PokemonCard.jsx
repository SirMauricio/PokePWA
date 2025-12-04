import "./PokemonCard.css";
import typeColors from "../utils/typeColors";

export default function PokemonCard({
    pokemon,
    onSelect,
    onToggleFavorite,
    isFavorite,
}) {
    const mainColor = typeColors[pokemon.types[0]] || "#3e3434ff";

    return (
        <div
            className="pokemon-card"
            onClick={() => onSelect(pokemon)}
            style={{ borderColor: mainColor }}
        >
            <div className="pokemon-header" style={{ backgroundColor: mainColor }}>
                <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-img" />
            </div>

            <h2 className="pokemon-name">{pokemon.name}</h2>
            <p className="pokemon-id">#{pokemon.id}</p>

            <div className="pokemon-types">
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className="pokemon-type-badge"
                        style={{ backgroundColor: typeColors[type] || "#666" }}
                    >
                        {type.toUpperCase()}
                    </span>
                ))}
            </div>

            <button
                className={`fav-btn ${isFavorite ? "fav-active" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pokemon);
                }}
            >
                {isFavorite ? "❤️" : "🤍"} Favorito
            </button>
        </div>
    );
}




