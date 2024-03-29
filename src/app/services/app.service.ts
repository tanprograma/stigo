import { Injectable } from '@angular/core';
import { Outlet, InventoryItem, User, LoginRes } from '../interfaces';
import { Observable, catchError, tap } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  api = environment.url;
  outlets = [];
  medicines = [];
  stock: InventoryItem[] = [];
  inventory: any[] = [];
  outlet: Outlet = {
    name: 'MAINCLINIC',
    isWarehouse: false,
  };
  stores: Outlet[] = [];
  constructor(private http: HttpService) {}
  getStock(f?: Function): Observable<InventoryItem[]> {
    const url = `${this.api}/inventories/${this.outlet.name}`;
    return this.http
      .get<InventoryItem[]>(url)
      .pipe(
        tap(
          (_) => console.log(`fetched ${url}`),
          catchError(this.http.handleError<InventoryItem[]>('fetch stock', []))
        )
      );
  }
  getStores(): Observable<Outlet[]> {
    const url = `${this.api}/stores`;
    return this.http
      .get<Outlet[]>(url)
      .pipe(
        tap(
          (_) => console.log(`fetched ${url}`),
          catchError(this.http.handleError<Outlet[]>('fetch outlet', []))
        )
      );
  }
  getUsers(): Observable<User[]> {
    const url = `${this.api}/users`;
    return this.http
      .get<User[]>(url)
      .pipe(
        tap(
          (_) => console.log(`fetched ${url}`),
          catchError(this.http.handleError<Outlet[]>('fetch users', []))
        )
      );
  }
  // login user
  login(item: User): Observable<LoginRes> {
    const url = `${this.api}/users/login`;
    return this.http.post<LoginRes>(url, item).pipe(
      tap((_) => {
        console.log(`post request to ${url}`);
      }),
      catchError(this.http.handleError<LoginRes>('dispense'))
    );
  }
  dispense(item: unknown): Observable<InventoryItem[]> {
    const url = `${this.api}/inventories/dispense/${this.outlet.name}`;
    return this.http.post<InventoryItem[]>(url, item).pipe(
      tap((_) => {
        console.log(`post request to ${url}`);
      }),
      catchError(this.http.handleError<InventoryItem[]>('dispense', []))
    );
  }
}
