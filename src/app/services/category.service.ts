import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private dataUrl = 'assets/data/data.json';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<{categories: string[]}>(this.dataUrl).pipe(
      map(data => data.categories)
    )
  }
}
