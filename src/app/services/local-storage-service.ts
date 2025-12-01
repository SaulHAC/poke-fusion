import { Injectable } from '@angular/core';
import { FusedPokemon } from '../models/pokemon.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getFavorites(): FusedPokemon[] {
    const favoritesString = localStorage.getItem(
      environment.LOCAL_STORAGE_FAVORITES_KEY
    );

    if (favoritesString) {
      return JSON.parse(favoritesString) as FusedPokemon[];
    }

    return [] as FusedPokemon[];
  }

  addToFavorites(fusedPokemon: FusedPokemon | undefined) {
    if (!fusedPokemon) {
      console.log('no se puede añadir un pokemon no definido');
      return;
    }

    const currentFavorites = this.getFavorites();

    const exists = currentFavorites.some(
      (fusePokemon) => fusePokemon.id === fusedPokemon.id
    );
    if (!exists) {
      currentFavorites.push(fusedPokemon);

      localStorage.setItem(
        environment.LOCAL_STORAGE_FAVORITES_KEY,
        JSON.stringify(currentFavorites)
      );
      console.log('pokemons añadido');
    } else {
      console.warn('el pokemon ya esta en favoritos');
    }
  }

  removeFromFavorites(fusedPokemon: FusedPokemon | undefined) {
    let currentFavorites = this.getFavorites();

    if (!fusedPokemon) {
      console.warn('no se proporcionó un pokemon para eliminar');
      return;
    }
    const updatedFavorites = currentFavorites.filter(
      (p) => p.id !== fusedPokemon.id
    );

    localStorage.setItem(
      environment.LOCAL_STORAGE_FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    console.log(`pokemon eliminado de favoritos`);
  }

  checkFavorite(fusedPokemon: FusedPokemon | null): boolean {
    const currentFavorites = this.getFavorites();

    const exists = currentFavorites.some(
      (fusePokemon) => fusePokemon.id === fusedPokemon?.id
    );

    if (exists) {
      return true;
    } else {
      return false;
    }
  }
}
