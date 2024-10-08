// Pokemon.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./Pokemon.css";
import Pager from "./Pager";  // Import du composant Pager

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);

        // Délai de 2 secondes
        const delay = new Promise(resolve => setTimeout(resolve, 2000));

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
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

          await delay; // Assure un minimum de 2 secondes de chargement
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
  }, [offset]);

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(prevOffset - limit, 0));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="PokemonTitle">Liste des Pokémon</h2>

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

        <Pager 
          handlePrevious={handlePrevious} 
          handleNext={handleNext} 
          isPreviousDisabled={offset === 0} 
        />
      </header>
    </div>
  );  
};

export default Pokemon;
