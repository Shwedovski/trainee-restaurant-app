import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRestuarantDish } from '../shared/interfaces/IRestaurantDish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<{ dishes: IRestuarantDish[] }>{
    return this.http.get<{ dishes: IRestuarantDish[] }>('assets/data/data.json');
  }
}
