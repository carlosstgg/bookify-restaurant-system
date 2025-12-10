import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory.models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/inventory';

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }

  create(item: Omit<InventoryItem, 'inventory_id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  update(id: number, item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
