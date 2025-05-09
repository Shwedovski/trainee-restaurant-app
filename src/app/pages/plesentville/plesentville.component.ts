import { Component, OnInit } from '@angular/core';
import { DishBoxComponent } from '../../dish-box/dish-box.component';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plesentville',
  imports: [DishBoxComponent,CommonModule],
  templateUrl: './plesentville.component.html',
  styleUrl: './plesentville.component.scss'
})

export class PlesentvilleComponent implements OnInit {
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