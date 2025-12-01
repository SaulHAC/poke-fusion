import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokeSerice {
  private randomPokemons: Pokemon[] = [];

  setRandomPokemons(pokemons: Pokemon[]): void {
    this.randomPokemons = pokemons;
  }

  getRandomPokemons(): Pokemon[] {
    return this.randomPokemons;
  }

  constructor(private http: HttpClient) {}

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<any>(`${environment.API_URL}${id}`).pipe(
      map((data) => {
        return {
          id: data.id,
          name: data.name,
          types: data.types.map((item: any) => item.type.name),
          stats: data.stats.reduce((statsFinalObj: any, statItem: any) => {
            statsFinalObj[statItem.stat.name] = statItem.base_stat;
            return statsFinalObj;
          }, {}),
          moves: data.moves.map((moveItem: any) => moveItem.move.name),
          sprite: data.sprites.other['official-artwork'].front_shiny,
        } as Pokemon;
      })
    );
  }

  getRandomPokemon(): Observable<Pokemon> {
    const id = Math.floor(Math.random() * 1010) + 1;
    return this.getPokemonById(id);
  }
}
