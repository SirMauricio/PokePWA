import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import PokemonModal from "./components/PokemonModal";
import { usePokemonList } from "./hooks/usePokemonList";
import "./App.css";
import Splash from "./Splash";


const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

function App() {
  const [offset, setOffset] = useState(0);
  const { pokemons, loading } = usePokemonList(offset);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [splashFinished, setSplashFinished] = useState(false);
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorito = (pokemon) => {
    const esFavorito = favoritos.some((f) => f.id === pokemon.id);
    let nuevosFavoritos;

    if (esFavorito) {
      nuevosFavoritos = favoritos.filter((f) => f.id !== pokemon.id);
    } else {
      nuevosFavoritos = [...favoritos, pokemon];
      mostrarNotificacionLocal(pokemon);
    }

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  const mostrarNotificacionLocal = async (pokemon) => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      const permiso = await Notification.requestPermission();
      if (permiso === "granted") {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification("¡Nuevo Pokémon favorito! ❤️", {
          body: `${pokemon.name.toUpperCase()} fue agregado a tus favoritos.`,
          icon: pokemon.sprite,
        });
      }
    }
  };

  const filteredPokemons = pokemons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.error("Error al registrar SW:", err));
    }
  }, []);

if (!splashFinished) {
  return <Splash onFinish={() => setSplashFinished(true)} />;
}

  return (
    <div className="app-container">
      <h1 className="title">Pokédex API</h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="loading-text">Cargando Pokémon...</p>
      ) : (
        <PokemonList
          pokemons={filteredPokemons}
          favoritos={favoritos}
          onToggleFavorite={toggleFavorito}
          onSelect={setSelectedPokemon}
          typeColors={typeColors}
        />
      )}

      <div className="pagination">
        <button onClick={() => setOffset(Math.max(0, offset - 20))} disabled={offset === 0}>
          ◀ Anterior
        </button>
        <button onClick={() => setOffset(offset + 20)}>Siguiente ▶</button>
      </div>

      <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} typeColors={typeColors} />
    </div>
  );
}

export default App;
