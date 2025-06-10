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
      map(dishes => dishes.reduce((total, dish) => total + dish.price, 0))
    );
  }

  addToBasket(dish: IRestaurantDish): void {
    const current = this.basketStore$.value;
    this.basketStore$.next([...current, { ...dish }]);
  }

  clearBasket(): void {
    this.basketStore$.next([]);
  }

  removeFromBasket(dish: IRestaurantDish): void {
    const current = this.basketStore$.value;
    const index = current.findIndex(
      d => d.name === dish.name && d.restaurant === dish.restaurant
    );
    if (index > -1) {
      const updated = [...current];
      updated.splice(index, 1);
      this.basketStore$.next(updated);
    }
  }
}