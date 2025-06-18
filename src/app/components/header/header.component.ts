import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { map, Observable } from "rxjs";
import { CommonModule } from '@angular/common';
import { DishService } from "../../services/dish.service";

@Component({
  selector: 'app-header',
  imports: [RouterLink,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  totalPrice$: Observable<number>;

  constructor(private router: Router,
              private dishServise: DishService,
  ) { }

  ngOnInit(): void {
    this.totalPrice$ = this.dishServise.getTotalPrice();
  }

  onRestaurantChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    console.log("selectedRestaurant", value);
    if (value) {
      this.router.navigate([value]);
    }
  }
}
