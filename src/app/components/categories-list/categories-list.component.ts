import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  categoriesNames: string[] = [];

  constructor(private categoryServise: CategoryService) { }

  ngOnInit() {
    this.initCategories();
  }

  getCategoryName(category: string): string {
    switch (category) {
      case 'burger': return 'Бургери';
      case 'pizza': return 'Піца';
      case 'salad': return 'Салати';
      case 'pasta': return 'Паста';
      default: return category;
    }
  }

  imageError(event: Event) {
    const target = event.target as HTMLImageElement;

    target.src = 'assets/images/default.png';
  }

  initCategories(): void {
    this.categoryServise.getCategories().subscribe(data => {
      this.categoriesNames = data;
    });
  }
}
