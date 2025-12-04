import { useState, useEffect } from "react";

export function useFavorite() {
    const [favorites, setFavorites] = useState([]);

    // Cargar favoritos desde localStorage
    useEffect(() => {
        const stored = localStorage.getItem("favoritePokemons");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    // Guardar favoritos en localStorage
    useEffect(() => {
        localStorage.setItem("favoritePokemons", JSON.stringify(favorites));
    }, [favorites]);

    // Alternar favorito
    const toggleFavorite = (pokemon) => {
        const exists = favorites.some((fav) => fav.id === pokemon.id);

        let updated;
        if (exists) {
            updated = favorites.filter((fav) => fav.id !== pokemon.id);
        } else {
            updated = [...favorites, pokemon];
            showNotification(pokemon);
        }

        setFavorites(updated);
    };

    // Notificación nativa
    const showNotification = (pokemon) => {
        if (!("Notification" in window)) return;

        if (Notification.permission === "granted") {
            new Notification("Nuevo Pokémon favorito", {
                body: `Has marcado a ${pokemon.name} como favorito.`,
                icon: pokemon.sprite,
            });
        }
    };

    // Verificar si un Pokémon es favorito
    const isFavorite = (id) => {
        return favorites.some((fav) => fav.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}

