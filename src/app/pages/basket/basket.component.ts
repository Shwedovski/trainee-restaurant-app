import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule, MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-basket',
  imports: [
    DishBoxComponent,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basketDishes: IRestaurantDish[] = [];

  constructor(private dishService: DishService,
  ) { }

  ngOnInit(): void {
    this.basketDishes = this.dishService.basketDishesStore;
  }

  removeAllBasket(): void {
    this.dishService.basketDishesStore.length = 0;
  }

  removeFromBasket(dish: IRestaurantDish): void {
    const index = this.dishService.basketDishesStore.findIndex(
      d => d.name === dish.name && d.restaurant === dish.restaurant
    );
    if (index > -1) {
      this.dishService.basketDishesStore.splice(index, 1);
    }
  }

}
