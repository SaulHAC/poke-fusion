import { Component, OnInit } from '@angular/core';
import { Topbar } from '../../component/topbar/topbar';
import { LocalStorageService } from '../../services/local-storage-service';
import { FusedPokemon } from '../../models/pokemon.model';
import { PokemonCard } from '../../component/pokemon-card/pokemon-card';

@Component({
  selector: 'app-favorites',
  imports: [Topbar, PokemonCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  public favorites: FusedPokemon[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = this.localStorageService.getFavorites();
  }

  onPokemonRemoved() {
    this.getFavorites();
  }
}
