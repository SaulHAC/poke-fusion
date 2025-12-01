import { Component, OnInit } from '@angular/core';
import { PokeSerice } from '../../services/poke-serice';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private pokeService: PokeSerice) {}

  ngOnInit(): void {
    this.pokeService.getRandomPokemon().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
