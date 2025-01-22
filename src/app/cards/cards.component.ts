import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.services';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent  implements OnInit {
  constructor(private cardsService: CardsService ) {}

  cards: any;

  ngOnInit(): void {
    this.cardsService.getData().subscribe((data) => {
      this.cards = data;
      console.log(this.cards);
    });
  }
}
