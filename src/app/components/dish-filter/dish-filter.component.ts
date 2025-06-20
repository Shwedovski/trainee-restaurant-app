import { Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import { IRestaurantDish } from '../../shared/interfaces/IRestaurantDish';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dish-filter',
  imports: [
    MatSliderModule,
    FormsModule,
  ],
  templateUrl: './dish-filter.component.html',
  styleUrl: './dish-filter.component.scss'
})
export class DishFilterComponent {

}
