import { Injectable } from '@angular/core';
import { Outlet, InventoryItem, User, LoginRes } from '../interfaces';
import { Observable, catchError, tap } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Inventory } from '../interfaces/inventory';
import { Sale } from '../interfaces/sale';
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
  getStock(f?: Function): Observable<Inventory[]> {
    const url = `${this.api}/inventories/store/${this.outlet._id}`;
    return this.http
      .get<Inventory[]>(url)
      .pipe(
        tap(
          (_) => console.log(`fetched ${url}`),
          catchError(this.http.handleError<Inventory[]>('fetch stock', []))
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
  getUsers() {
    const url = `${this.api}/users`;
    return this.http
      .get<any>(url)
      .pipe(
        tap(
          (_) => console.log(`fetched ${url}`),
          catchError(this.http.handleError<any>('fetch users'))
        )
      );
  }
  // login user
  login(item: User) {
    const url = `${this.api}/users/login`;
    return this.http
      .post<any>(url, { email: item.username, password: item.password })
      .pipe(
        tap((_) => {
          console.log(`post request to ${url}`);
        }),
        catchError(this.http.handleError<any>('dispense'))
      );
  }
  dispense(item: unknown): Observable<InventoryItem[]> {
    const url = `${this.api}/sales/dispense/create`;

    return this.http.post<any>(url, this.createDispensedData(item)).pipe(
      tap((_) => {
        console.log(`post request to ${url}`);
      }),
      catchError(this.http.handleError<any>('dispense', []))
    );
  }
  dispenseNew(item: unknown) {
    const url = `${this.api}/sales/create`;

    return this.http.post<any>(url, this.createDispensedData(item)).pipe(
      tap((_) => {
        console.log(`post request to ${url}`);
      }),
      catchError(this.http.handleError<any>('dispense', []))
    );
  }
  createDispensedData(items: any): Sale {
    const data = {
      store: this.outlet._id as string,
      customer: '0000',
      products: items.map((item: any) => {
        return {
          product: this.findProduct(item.commodity)?.commodity_id as string,
          quantity: item.quantity,

          unit: this.findProduct(item.commodity)?.unit_smallest as string,
          unit_value: this.findProduct(item.commodity)
            ?.unit_value_smallest as number,
        };
      }),
      discount: 0,
    };
    console.log(data);
    return data;
  }
  findProduct(product: string) {
    console.log({ stock: this.stock });
    return this.stock.find((item) => {
      return item.commodity == product;
    });
  }
  getStoreID() {
    const v = JSON.parse(sessionStorage.getItem('outlet') as string);
    return v._id as string;
  }

  //   {
  //   _id?: string;
  //   store: string | Store;
  //   customer?: string | Customer;
  //   createdAt?: string;
  //   updatedAt?: string;
  //   products: TransactionItem[];
  //   discount: number;
  // }
}
