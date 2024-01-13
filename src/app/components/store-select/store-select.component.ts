import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Outlet, User } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-store-select',
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.css'],
})
export class StoreSelectComponent implements OnInit {
  loading = false;
  loggedIn = false;
  stores: Outlet[] = [];
  authStores: Outlet[] = [];
  users: User[] = [];
  outlet = '';
  message = 'fetching resources';
  constructor(private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.initialize();
  }
  setOutlet() {
    const found = this.app.stores.find((store) => {
      return store.name == this.outlet;
    });

    if (found != undefined) {
      this.app.outlet = found;
      this.app.getStock();
      this.router.navigate(['/app/dispense']);
    }
  }
  initialize() {
    this.loading = true;
    forkJoin<[User[], Outlet[]]>([
      this.app.getUsers(),
      this.app.getStores(),
    ]).subscribe((result) => {
      this.users = result[0];
      this.app.stores = result[1];
      console.log('fetched data');
      this.loading = false;
    });
  }
  login(user: User) {
    this.loading = true;
    this.message = 'sending login request..';
    this.app.login(user).subscribe((res) => {
      this.loading = false;

      if (res.error == null) {
        this.loggedIn = true;
        this.authStores = this.app.stores.filter((store) => {
          if (res.result?.role == 'admin'.toUpperCase()) return true;
          return store.name.toUpperCase() == res.result?.role?.toUpperCase();
        });
      }
      return;
    });
  }
}
