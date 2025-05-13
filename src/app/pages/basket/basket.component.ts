import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [
    DishBoxComponent,
    CommonModule,
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

  
}
