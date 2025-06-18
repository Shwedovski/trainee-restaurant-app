import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';
import { DishService } from '../services/dish.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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

  @Output() removedDishEvent: EventEmitter<IRestaurantDish> = new EventEmitter<IRestaurantDish>();

  dishInBasket: boolean = false;
  quantityInBasket: number = 0;

  constructor(private dishService: DishService,
  ) { }


  ngOnInit(): void {
    this.initQuantity();
  }

  addDishToBasket(): void {
    this.dishService.addToBasket(this.dish);
  }

  addDishToFavorite(): void {
    this.dishService.favoriteDishesStore.push(this.dish);
  }

  increaseQuantity(dish: IRestaurantDish): void {
    this.dishService.increaseQuantity(dish);
  }

  decreaseQuantity(dish: IRestaurantDish): void {
    this.dishService.decreaseQuantity(dish);
  }

  private initQuantity(): void {
    this.dishService.basketStore$.subscribe((dishesInBasket: IRestaurantDish[]) => {
      const findDishInBasket: IRestaurantDish | undefined = dishesInBasket.find(
        basketDish => basketDish.name === this.dish.name && basketDish.restaurant === this.dish.restaurant
      );

      if (findDishInBasket) {
        this.dishInBasket = true;
        this.quantityInBasket = findDishInBasket.quantity ?? 0;
      } else {
        this.dishInBasket = false;
        this.quantityInBasket = 0;
      }
    });
  }

}
