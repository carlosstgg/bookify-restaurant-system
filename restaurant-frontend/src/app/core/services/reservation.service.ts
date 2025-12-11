import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Reservation {
  reservation_id?: number;
  table_id: number;
  customer_name: string;
  customer_phone?: string;
  reservation_time: string | Date;
  duration: number; // minutes
  people_count: number;
  status?: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  table?: any; // Table detail
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reservations`;

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  update(id: number, reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cancel(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}/cancel`, {});
  }

  getAvailableTables(date: Date, duration: number = 120): Observable<any[]> {
    let params = new HttpParams()
      .set('date', date.toISOString())
      .set('duration', duration.toString());
      
    return this.http.get<any[]>(`${this.apiUrl}/available-tables`, { params });
  }
}
