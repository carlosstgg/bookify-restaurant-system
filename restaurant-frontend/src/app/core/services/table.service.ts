import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/table.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tables';

  getAll(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl);
  }

  getById(id: number): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/${id}`);
  }

  create(table: { table_number: number, capacity: number }): Observable<Table> {
    return this.http.post<Table>(this.apiUrl, table);
  }

  update(id: number, table: Partial<Table>): Observable<Table> {
    return this.http.put<Table>(`${this.apiUrl}/${id}`, table);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
