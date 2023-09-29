import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest} from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = 'http://localhost:5166/api/Categories';
  constructor(private http: HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(this.API_URL, model);
  }

  fetchData(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  deleteData(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }
  // Update a category by ID
  editCategory(id: string, categoryData: any): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put(url, categoryData);
  }
}
