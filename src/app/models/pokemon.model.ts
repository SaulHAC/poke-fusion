export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: { [key: string]: number };
  moves: string[];
  sprite: string;
}

export interface FusedPokemon {
  id: string;
  name: string;
  types: string[];
  stats: { [key: string]: number };
  moves: string[];
  sprite: string;
}
