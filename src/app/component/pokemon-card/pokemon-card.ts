import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FusedPokemon } from '../../models/pokemon.model';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  @Input() pokemon?: FusedPokemon;

  @Output() removed = new EventEmitter<FusedPokemon>();

  constructor(private localStorageService: LocalStorageService) {}

  removeFromFavorites(pokemon: FusedPokemon) {
    this.localStorageService.removeFromFavorites(pokemon);

    this.removed.emit();
  }
}
