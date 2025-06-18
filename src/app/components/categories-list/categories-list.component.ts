import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  @Input() categoriesNames: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

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

  onCategorySelected(category: string) {
    this.categorySelected.emit(category);
  }
}
