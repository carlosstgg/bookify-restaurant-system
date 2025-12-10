import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  // Direct route as identified previously
  private apiUrl = 'http://localhost:3000/employees';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(employee: Omit<User, 'employee_id'> & { password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, employee);
  }

  update(id: number, employee: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
