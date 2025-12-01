import { Injectable } from '@angular/core';
import { FusedPokemon, Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeFusionService {
  fuse(pokemons: Pokemon[]): FusedPokemon {
    const id = Date.now().toString();

    const name = pokemons.map((p) => p.name.slice(0, 3)).join('');

    const sprite = pokemons[0].sprite;

    const allTypes = pokemons.flatMap((p) => p.types);
    const types = Array.from(new Set(allTypes));

    const stats: { [key: string]: number } = {};
    for (const pokemon of pokemons) {
      for (const statName in pokemon.stats) {
        stats[statName] = (stats[statName] || 0) + pokemon.stats[statName];
      }
    }

    const allMoves = pokemons.flatMap((p) => p.moves);
    const movesNoRepeat = Array.from(new Set(allMoves));

    const firstMoveIndex = Math.floor(Math.random() * movesNoRepeat.length);
    const secondMoveIndex = Math.floor(Math.random() * movesNoRepeat.length);

    let moves = [];
    moves.push(movesNoRepeat[firstMoveIndex]);

    if (firstMoveIndex !== secondMoveIndex) {
      moves.push(movesNoRepeat[secondMoveIndex]);
    }

    return { id, name, sprite, types, stats, moves };
  }
}
