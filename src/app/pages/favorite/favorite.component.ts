import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [
    CommonModule,
    DishBoxComponent
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  favoriteDishes: IRestaurantDish[] = [];

  constructor(private dishService: DishService,
  ) { }

  ngOnInit(): void {
    this.favoriteDishes = this.dishService.favoriteDishesStore;
  }
}

