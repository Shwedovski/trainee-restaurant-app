import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  basketDishesStore: IRestaurantDish[] = [];
  favoriteDishesStore: IRestaurantDish[] = [];
  basketStore$ = new BehaviorSubject<IRestaurantDish[]>(this.basketDishesStore);

  constructor(private http: HttpClient) { }

  getDishes(): Observable<{ dishes: IRestaurantDish[] }> {
    return this.http.get<{ dishes: IRestaurantDish[] }>('assets/data/data.json');
  }

  getTotalPrice(): Observable<number> {
    return this.basketStore$.pipe(
      map(dishes => dishes.reduce((total, dish) => total + dish.price * (dish.quantity || 1), 0))
    );
  }

  addToBasket(dish: IRestaurantDish): void {
    const currentDishes = this.basketStore$.value;
    this.basketStore$.next([...currentDishes, { ...dish }]);
  }

  clearBasket(): void {
    this.basketStore$.next([]);
  }

  removeFromBasket(dish: IRestaurantDish): void {
    const currentDishes: IRestaurantDish[] = this.basketStore$.value;
    const index: number = currentDishes.findIndex(
      basketDish => basketDish.name === dish.name && basketDish.restaurant === dish.restaurant
    );

    if(index > -1) {
      const updated: IRestaurantDish[] = [...currentDishes];

      updated.splice(index, 1);
      this.basketStore$.next(updated);
    }
  }

  increaseQuantity(dish: IRestaurantDish): void {
    const currentDishes: IRestaurantDish[] = this.basketStore$.value.map(
      basketDish => basketDish.name === dish.name && basketDish.restaurant === dish.restaurant
        ? { ...basketDish, quantity: Math.max(basketDish.quantity || 1) + 1 }
        : basketDish
    );

    this.basketStore$.next(currentDishes);
  }

  decreaseQuantity(dish: IRestaurantDish): void {
    const currentDishes: IRestaurantDish[] = this.basketStore$.value.map(
      basketDish => basketDish.name === dish.name && basketDish.restaurant === dish.restaurant
        ? { ...basketDish, quantity: ((basketDish.quantity || 1) - 1, 1) }
        : basketDish
    );
    
    this.basketStore$.next(currentDishes);
  }
}