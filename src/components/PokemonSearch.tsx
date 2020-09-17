import React, { useState, FC } from "react";
import { PokemonSearchProps, SearchState } from "../interfaces/User.Interface";

const PokemonSearch: FC<PokemonSearchProps> = ({
  userName,
  numberOfPokemons,
}) => {
  const pokemonRef = React.useRef<HTMLInputElement>(null);

  const [state, setState] = useState<SearchState>({
    error: false,
    pokemon: null,
  });

  const onSearchClick = (): void => {
    const inputValue = pokemonRef.current.value;
    fetch(`http://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        setState({ ...state, error: true });
        return;
      }
      res.json().then((data) => {
        setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
          },
        });
      });
    });
  };
  const { error, pokemon } = state;
  let resultMarkUp;

  if (error) {
    resultMarkUp = <p>Pokemon not found, please try again</p>;
  } else if (state.pokemon) {
    resultMarkUp = (
      <div>
        <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
        <p>
          {pokemon.name} base {pokemon.numberOfAbilities} abilities and{" "}
          {pokemon.baseExperience} base expererience points
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        User {userName}
        {numberOfPokemons && <span> has {numberOfPokemons} pokemons </span>}
      </p>
      <input type="text" ref={pokemonRef} />
      <button onClick={onSearchClick} className="my-button">
        Search
      </button>
      {resultMarkUp}
    </div>
  );
};

export default PokemonSearch;
