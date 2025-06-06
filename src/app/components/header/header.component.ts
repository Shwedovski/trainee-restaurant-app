import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { map } from "rxjs";
import { DishService } from "../../services/dish.service";

@Component({
  selector: 'app-header',
  imports: [RouterLink,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  onRestaurantChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    console.log("selectedRestaurant", value);
    if (value) {
      this.router.navigate([value]);
    }
  }
  
}
