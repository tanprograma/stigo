import { Injectable } from '@angular/core';
import { Outlet, InventoryItem } from '../interfaces';
import { Observable, catchError, tap } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  api = 'http://127.0.0.1:5000/api';
  outlets = [];
  medicines = [];
  stock: InventoryItem[] = [];
  inventory: any[] = [];
  outlet: Outlet = {
    name: 'MAINCLINIC',
    isWarehouse: false,
  };
  stores: Outlet[] = [
    {
      name: 'MAINCLINIC',
      isWarehouse: false,
    },
    {
      name: 'SADDLEDAM',
      isWarehouse: false,
    },
    {
      name: 'POWERHOUSE',
      isWarehouse: false,
    },
    {
      name: 'RIGHTBANK',
      isWarehouse: false,
    },
  ];
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
