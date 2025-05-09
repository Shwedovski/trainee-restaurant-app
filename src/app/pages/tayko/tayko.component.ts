import { Component, OnInit } from '@angular/core';
import { DishBoxComponent } from '../../dish-box/dish-box.component';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tayko',
  imports: [DishBoxComponent, CommonModule],
  templateUrl: './tayko.component.html',
  styleUrl: './tayko.component.scss'
})
export class TaykoComponent implements OnInit {
  restaurantDishes: IRestaurantDish[] = [];
  restaurantName: string = '';

  constructor(private route: ActivatedRoute,
            private dishService: DishService,
  ) { }

  ngOnInit(): void {
    this.restaurantName = this.route.snapshot.routeConfig?.path || '';

    this.dishService.getDishes().subscribe(data => {
      const allDishes: IRestaurantDish[] = data.dishes;

      this.restaurantDishes = allDishes.filter((dish: IRestaurantDish) => dish.restaurant?.toLowerCase() === this.restaurantName?.toLowerCase());
    });
  }
}