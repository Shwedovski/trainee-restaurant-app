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

  constructor(private http: HttpClient) { }

  getDishes(): Observable<{ dishes: IRestaurantDish[] }> {
    return this.http.get<{ dishes: IRestaurantDish[] }>('assets/data/data.json');
  }

}