import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, CreateOrderRequest } from '../models/order.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(order: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  update(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
