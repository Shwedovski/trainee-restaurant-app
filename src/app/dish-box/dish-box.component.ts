import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { IRestaurantDish } from '../shared/interfaces/IRestaurantDish';

@Component({
  selector: 'app-dish-box',
  imports: [CommonModule],
  templateUrl: './dish-box.component.html',
  styleUrl: './dish-box.component.scss'
})
export class DishBoxComponent {
  @Input() dishes: IRestaurantDish [] = [];
}
