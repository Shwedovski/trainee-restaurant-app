import { Component } from '@angular/core';
import { CategoriesListComponent } from '../../components/categories-list/categories-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
