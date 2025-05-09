import { Component, OnInit } from '@angular/core';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-mario',
  imports: [DishBoxComponent, CommonModule],
  templateUrl: './mario.component.html',
  styleUrl: './mario.component.scss'
})
export class MarioComponent implements OnInit {
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