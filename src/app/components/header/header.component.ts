import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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
