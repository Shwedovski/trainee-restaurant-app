import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<{ dishes: IRestaurantDish[] }>{
    return this.http.get<{ dishes: IRestaurantDish[] }>('assets/data/data.json');
  }
}
