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
export class FavoriteComponent implements OnInit {
  favoriteDishes: IRestaurantDish[] = [];

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.favoriteDishes = this.dishService.favoriteDishesStore;
  }

  removeAllFavorites(): void {
    this.dishService.favoriteDishesStore.length = 0; 
  }

  removeFromFavorites(dish: IRestaurantDish): void {
    const index = this.dishService.favoriteDishesStore.findIndex(
      d => d.name === dish.name && d.restaurant === dish.restaurant
    );
    if (index > -1) {
      this.dishService.favoriteDishesStore.splice(index, 1);
    }
  }
}



