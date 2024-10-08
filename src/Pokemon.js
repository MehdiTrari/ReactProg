// Pokemon.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./Pokemon.css";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

        if (res.ok) {
          const data = await res.json();
          
          const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              const details = await response.json();
              return {
                name: pokemon.name,
                image: details.sprites.front_default
              };
            })
          );

          setPokemonList(pokemonDetails);
        } else {
          console.error("Erreur lors de la récupération des Pokémon");
        }
      } catch (error) {
        console.error("Erreur de réseau", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Liste des 20 premiers Pokémon</h2>

        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <ul className="pokemon-list">
            {pokemonList.map((pokemon, index) => (
              <li key={index} className="pokemon-item">
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default Pokemon;
