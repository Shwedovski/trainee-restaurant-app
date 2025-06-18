import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  @Input() categoriesNames: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

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

  onCategorySelected(category: string) {
    this.categorySelected.emit(category);
  }

  initCategories(): void {
    this.categoryServise.getCategories().subscribe(data => {
      this.categoriesNames = data;
    });
  }
}
