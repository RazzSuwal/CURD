import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  data: any;

  private getCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategorySubscription = this.categoryService.fetchData().subscribe((response) => {
      this.data = response
    });
  }

  onDelete(id: number): void {
    this.getCategorySubscription = this.categoryService.deleteData(id).subscribe(() => {
      this.refreshData();
    });

  }

  refreshData(): void {
    this.getCategorySubscription = this.categoryService.fetchData().subscribe((response) => {
      this.data = response
    });
  }

  ngOnDestroy(): void {
    this.getCategorySubscription?.unsubscribe();
  }
}
