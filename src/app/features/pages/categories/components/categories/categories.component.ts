import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../cart/models/cart.interface';
import { CategoriesService } from '../../../../../shared/service/categoies/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  _categoriesService = inject(CategoriesService);

  categories!: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log('err');
      },
      complete: () => {
        console.log('complete categories');
      },
    });
  }
}
