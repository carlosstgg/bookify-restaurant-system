import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu.models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/menu-items';

  getAll(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${id}`);
  }

  create(item: Omit<MenuItem, 'item_id' | 'category'>): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, item);
  }

  update(id: number, item: Partial<MenuItem>): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
