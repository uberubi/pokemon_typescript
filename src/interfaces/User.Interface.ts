export interface PokemonSearchProps {
  userName: string;
  numberOfPokemons?: number;
}

export interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}
