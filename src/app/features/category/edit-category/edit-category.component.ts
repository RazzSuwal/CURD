import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  model: Category = {
    id: '',       // Initialize with an empty string
    name: '',     // Initialize with an empty string
    urlHandle: ''
  };

  private addCategorySubscription?: Subscription;
  private id: string = ''; // Declare and initialize id here

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route or url vaneihunxa
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.id).subscribe((data: Category) => {
      this.model = data;
    });
  }
  onFormSubmit(): void {
    this.addCategorySubscription = this.categoryService.editCategory(this.id, this.model)
      .subscribe({
        next: (response) => {
          console.log("Edit successful");
          this.router.navigate(['/admin/categories']);
        },
        error: (error) => {
          console.error("Edit failed:", error);
          // Handle the error, e.g., display an error message to the user
        }
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}

