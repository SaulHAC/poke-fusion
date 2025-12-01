import { Component, OnInit } from '@angular/core';
import { PokeSerice } from '../../services/poke-serice';
import { forkJoin, Observable } from 'rxjs';
import { FusedPokemon, Pokemon } from '../../models/pokemon.model';
import { PokeFusionService } from '../../services/poke-fusion-service';
import { Topbar } from '../../component/topbar/topbar';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-home',
  imports: [Topbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private pokeService: PokeSerice,
    private pokeFusionService: PokeFusionService,
    private localStorageService: LocalStorageService
  ) {}

  public pokemons: Pokemon[] = [];
  public fusedPokemon: FusedPokemon | undefined;

  public isLoading: boolean = true;
  public error: boolean = false;

  public favorite: boolean = false;
  public randomPokemons: Pokemon[] = [];

  ngOnInit(): void {
    const lastFusion = this.pokeFusionService.getLastFusion();
    const randomPokemons = this.pokeService.getRandomPokemons();

    this.favorite = this.localStorageService.checkFavorite(lastFusion);

    if (lastFusion) {
      this.isLoading = false;
      this.fusedPokemon = lastFusion;
      this.pokemons = randomPokemons;
    } else {
      this.loadAllPokemonsAndFuse();
    }
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

        this.pokeFusionService.setLastFusion(this.fusedPokemon);
        this.pokeService.setRandomPokemons(this.pokemons);

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

  addToFavorites() {
    this.localStorageService.addToFavorites(this.fusedPokemon);
    this.favorite = true;
  }

  removeFromFavorites() {
    this.localStorageService.removeFromFavorites(this.fusedPokemon);
    this.favorite = false;
  }

  refuse() {
    this.isLoading = true;
    this.fusedPokemon = undefined;
    this.loadAllPokemonsAndFuse();
  }
}
