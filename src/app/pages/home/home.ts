import { Component, OnInit } from '@angular/core';
import { PokeSerice } from '../../services/poke-serice';
import { forkJoin, Observable } from 'rxjs';
import { FusedPokemon, Pokemon } from '../../models/pokemon.model';
import { PokeFusionService } from '../../services/poke-fusion-service';
import { Topbar } from '../../component/topbar/topbar';

@Component({
  selector: 'app-home',
  imports: [Topbar],
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

  public isLoading: boolean = true;
  public error: boolean = false;

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
        this.isLoading = false;

        console.log('pokemon fusionado: ', this.fusedPokemon);
        console.log('pokemons random: ', this.pokemons);
      },
      error: (error) => {
        console.error('Error al cargar algún pokemon: ', error);
        this.error = true;
        this.isLoading = false;
      },
    });
  }

  refuse() {
    this.isLoading = true;
    this.fusedPokemon = undefined;
    this.loadAllPokemonsAndFuse();
  }
}
