import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from 'src/shared/login';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8084';

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return new Promise<ILogin>((resolve, reject) => {
      this.http.post<ILogin>(`${this.baseUrl}/login`, body, { headers: headers })
        .pipe(
          catchError((error) => {
            console.error(error);
            return Promise.reject(error);
          })
        )
        .subscribe(
          (response) => {
            if (response && response.accessToken) {
              localStorage.clear();
              localStorage.setItem('accessToken', response.accessToken);
            }
            resolve(response);
          }
        );
    });
  }

  

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${this.baseUrl}/logout`)
        .pipe(
          catchError((error) => {
            console.error(error);
            return Promise.reject(error);
          })
        )
        .subscribe(
          () => {
            localStorage.clear();
            resolve();
          }
        );
    });
  }
}
