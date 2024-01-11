import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Outlet } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-store-select',
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.css'],
})
export class StoreSelectComponent implements OnInit {
  stores: Outlet[] = [];
  outlet = '';
  constructor(private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.stores = this.app.stores;
  }
  setOutlet() {
    if (this.outlet.length > 0) {
      const found = this.app.stores.find((store) => {
        return store.name == this.outlet;
      });
      if (found != undefined) {
        this.app.outlet = found;
        this.app.getStock();
        this.router.navigate(['/app/dispense']);
      }
    }
  }
}