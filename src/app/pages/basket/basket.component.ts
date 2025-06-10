import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';

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
export class BasketComponent  {
  basketDishes$: Observable<IRestaurantDish[]>;

  constructor(private dishService: DishService,
  ) {
    this.basketDishes$ = this.dishService.basketStore$.asObservable();
  }

  removeAllBasket(): void {
    this.dishService.clearBasket();
  }

  removeFromBasket(dish: IRestaurantDish): void {
    this.dishService.removeFromBasket(dish);
  }

}
