import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:4068';
  /**
   * metodo para  ubtener datos por rango de fechas
   * @param {string} startDate 
   * @param {string} endDate 
   * @returns {Observable<any[]>}
   */
  getDataByDate(startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.baseUrl}/adminimg/search/${startDate}/${endDate}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(url, { headers });
  }

  /**
   * metodo para  ubtener datos por dia
   * @returns {Observable<any[]>} - An observable of the data
   */
  getDataByDay(): Observable<any[]> {
    const url = `${this.baseUrl}/adminimg/groupByHour`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(url, { headers });
  }

}
