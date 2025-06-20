import { Component, OnInit } from '@angular/core';
import { CategoriesListComponent } from '../../components/categories-list/categories-list.component';
import { DishService } from '../../services/dish.service';
import { CategoryService } from '../../services/category.service';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import { CommonModule } from '@angular/common';
import { DishBoxComponent } from "../../dish-box/dish-box.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DishFilterComponent } from "../../components/dish-filter/dish-filter.component";

export enum SortOrders {
  ASC = 'asc',
  DESC = 'desc'
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategoriesListComponent,
    CommonModule,
    DishBoxComponent,
    MatButtonToggleModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {
  
  sortOrders = SortOrders;
  allDishes: IRestaurantDish[] = [];
  categories: string[] = [];
  selectedCategoryDishes: IRestaurantDish[] = [];
  selectedCategory: string = '';

  constructor(
    private dishService: DishService,
    private categoryServise: CategoryService,

  ) { }

  ngOnInit(): void {
    this.initCategories();
    this.initDishes();
  }

  onCategoryClick(category: string): void {
    this.selectedCategory = category;
    this.selectedCategoryDishes = this.allDishes
      .filter((dish: IRestaurantDish) => dish.category === category)
      .sort((ascDish, descDish) => (descDish.weeklyOrders || 0) - (ascDish.weeklyOrders || 0));

  }

  sortByOrders(directionOfSort: SortOrders): void {
    if (directionOfSort === SortOrders.ASC) {
      this.selectedCategoryDishes
        .sort((ascDish: IRestaurantDish, descDish: IRestaurantDish) =>
          (ascDish.weeklyOrders || 0) - (descDish.weeklyOrders || 0)
        );
    } else if (directionOfSort === SortOrders.DESC) {
      this.selectedCategoryDishes
        .sort((ascDish: IRestaurantDish, descDish: IRestaurantDish) =>
          (descDish.weeklyOrders || 0) - (ascDish.weeklyOrders || 0)
        );
    }
  }

  private initDishes(): void {
    this.dishService.getDishes().subscribe(dishes => {
      this.allDishes = dishes.dishes;
      this.onCategoryClick('burger');
    });
  }

  private initCategories(): void {
    this.categoryServise.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
    });
  }
}