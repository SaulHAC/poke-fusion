import { Component, OnInit } from '@angular/core';
import { PokeSerice } from '../../services/poke-serice';
import { forkJoin, Observable } from 'rxjs';
import { FusedPokemon, Pokemon } from '../../models/pokemon.model';
import { PokeFusionService } from '../../services/poke-fusion-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private pokeService: PokeSerice,
    private pokeFusionService: PokeFusionService
  ) {}

  public pokemons: Pokemon[] = [];
  public fusedPokemon: FusedPokemon | undefined;

  ngOnInit(): void {
    this.loadAllPokemonsAndFuse();
  }

  loadAllPokemonsAndFuse() {
    const pokemonRequests: Observable<Pokemon>[] = [];

    for (let i = 0; i < 3; i++) {
      pokemonRequests.push(this.pokeService.getRandomPokemon());
    }

    forkJoin(pokemonRequests).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;

        this.fusedPokemon = this.pokeFusionService.fuse(this.pokemons);

        console.log('pokemon fusionado: ', this.fusedPokemon);
        console.log('pokemons random: ', this.pokemons);
      },
    });
  }
}
