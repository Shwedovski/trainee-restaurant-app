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
  basketStore$: BehaviorSubject<IRestaurantDish[]> = new BehaviorSubject<IRestaurantDish[]>(this.basketDishesStore);

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
    const currentDishes: IRestaurantDish[] = this.basketStore$.value;
    const currentDishesIndex: number = currentDishes.findIndex(
      basketDish => basketDish.name === dish.name && basketDish.restaurant === dish.restaurant
    );

    if (currentDishesIndex > -1) {
      const updateDishQuantity: IRestaurantDish = {
        ...currentDishes[currentDishesIndex],
        quantity: (currentDishes[currentDishesIndex].quantity || 1) + 1
      };

      const updateDishes: IRestaurantDish[] = [...currentDishes];
      updateDishes[currentDishesIndex] = updateDishQuantity;

      this.basketStore$.next(updateDishes);
    } else {
      this.basketStore$.next([...currentDishes, { ...dish, quantity: 1 }]);
    }
  }

  clearBasket(): void {
    this.basketStore$.next([]);
  }

  removeFromBasket(dish: IRestaurantDish): void {
    const currentDishes: IRestaurantDish[] = this.basketStore$.value;
    const index: number = currentDishes.findIndex(
      basketDish => basketDish.name === dish.name && basketDish.restaurant === dish.restaurant
    );

    if (index > -1) {
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
    const currentDishes: IRestaurantDish[] = this.basketStore$.value;

    const updatedDishes: IRestaurantDish[] = currentDishes.reduce<IRestaurantDish[]>((updatedBasket, basketDish) => {

      if (basketDish.name === dish.name && basketDish.restaurant === dish.restaurant) {
        const currentQuantity: number = basketDish.quantity || 1;
        if (currentQuantity > 1) {
          updatedBasket.push({ ...basketDish, quantity: currentQuantity - 1 });
        }
      } else {
        updatedBasket.push(basketDish);
      }
      return updatedBasket;
    }, []);

    this.basketStore$.next(updatedDishes);
  }

  getAllDishes(): Observable<IRestaurantDish[]> {
    return this.http.get<{ dishes: IRestaurantDish[] }>('assets/data/data.json').pipe(
      map(data => data.dishes)
    );
  }
}