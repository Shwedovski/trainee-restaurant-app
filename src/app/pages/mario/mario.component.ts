import { Component, OnInit } from '@angular/core';
import { DishesComponent } from "../../dishes/dishes.component";
import { IRestuarantDish } from '../../shared/interfaces/IRestaurantDish';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-mario',
  imports: [DishesComponent, CommonModule],
  templateUrl: './mario.component.html',
  styleUrl: './mario.component.scss'
})
export class MarioComponent implements OnInit {
  restuarantDishes: IRestuarantDish[] = [];
  restuarantName: string = '';

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) { }

  ngOnInit(): void {
    this.restuarantName = this.route.snapshot.routeConfig?.path || '';
    console.log('mario?', this.restuarantName);

    this.dishService.getDishes().subscribe(data => {
      const allDishes: IRestuarantDish[] = data.dishes;
      console.log(allDishes);
      this.restuarantDishes = allDishes.filter(
        dish => dish.restuarant?.toLowerCase() === this.restuarantName?.toLowerCase()
      );
      console.log('filtered?', this.restuarantDishes);
    });
  }
}