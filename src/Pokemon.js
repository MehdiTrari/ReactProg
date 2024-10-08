// Pokemon.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./Pokemon.css";
import Pager from "./Pager";
import SelectLimit from "./SelectLimit";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20); // Limite sélectionnée
  const [totalPokemons, setTotalPokemons] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTotalPokemons = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`);
      if (res.ok) {
        const data = await res.json();
        setTotalPokemons(data.count);
      }
    };

    fetchTotalPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);

        const batchSize = 100; // Nombre de Pokémon par lot
        let allPokemon = [];
        let currentOffset = 0;

        // Utilisation de chargement par lots si "Tous" est sélectionné
        if (limit === -1) {
          while (currentOffset < totalPokemons) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${batchSize}`);
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

              allPokemon = [...allPokemon, ...pokemonDetails];
              currentOffset += batchSize;

              setPokemonList([...allPokemon]); // Mise à jour progressive de la liste
              await new Promise(resolve => setTimeout(resolve, 500)); // Pause pour éviter la surcharge
            } else {
              console.error("Erreur lors de la récupération des Pokémon");
              break;
            }
          }
        } else {
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

            await delay;
            setPokemonList(pokemonDetails);
          } else {
            console.error("Erreur lors de la récupération des Pokémon");
          }
        }
      } catch (error) {
        console.error("Erreur de réseau", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (limit === -1 && totalPokemons === null) {
      return;
    }

    fetchPokemon();
  }, [offset, limit, totalPokemons]);

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(prevOffset - limit, 0));
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setOffset(0);
  };

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="PokemonTitle">Liste des Pokémon</h2>

        {limit === -1 && (
          <input
            type="text"
            placeholder="Filtrer par nom de Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        )}

        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <ul className="pokemon-list">
            {filteredPokemonList.map((pokemon, index) => (
              <li key={index} className="pokemon-item">
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="pagination-controls">
          <Pager 
            handlePrevious={handlePrevious} 
            handleNext={handleNext} 
            isPreviousDisabled={offset === 0} 
          />
          <SelectLimit limit={limit} onLimitChange={handleLimitChange} />
        </div>
      </header>
    </div>
  );  
};

export default Pokemon;
