import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';
import { DishService } from '../services/dish.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule, MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-dish-box',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './dish-box.component.html',
  styleUrl: './dish-box.component.scss'
})
export class DishBoxComponent {
  @Input() dish: IRestaurantDish;
  @Input() showRemoveButton: boolean = false;
  @Input() IsBasket: boolean = false;
  @Input() showFavoriteButton: boolean = false;
  @Input() showBasketButton: boolean = false;
  @Output() remove = new EventEmitter<void>();

  constructor(private dishService: DishService,
  ) { }

  addDishToBasket(): void {
    this.dishService.addToBasket(this.dish);
  }

  addDishToFavorite(): void {
    this.dishService.favoriteDishesStore.push(this.dish);
  }

  removeDish(): void {
    this.remove.emit();
  }

  quantityInBasket: number = 1;

  increaceQuantity(): void {
    this.quantityInBasket++;
  }

  decreaseQuantity(): void {
    if (this.quantityInBasket > 1) {
      this.quantityInBasket--;
    }
  }
}
