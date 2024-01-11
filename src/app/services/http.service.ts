import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, item: unknown): Observable<T> {
    return this.http.post<T>(url, item, this.HttpOptions);
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: Error) => {
      console.log(`${operation} failed . ${error.message}`);
      return of(result as T);
    };
  }
}
