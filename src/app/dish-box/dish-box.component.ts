import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish-box',
  imports: [CommonModule],
  templateUrl: './dish-box.component.html',
  styleUrl: './dish-box.component.scss'
})
export class DishBoxComponent {
  @Input() dish: IRestaurantDish;

  constructor(private dishService: DishService,
  ) { }

  addDishToBasket(): void {
    this.dishService.basketDishesStore.push(this.dish);
  }

  addDishToFavorite(): void {
    this.dishService.favoriteDishesStore.push(this.dish);
  }
}
