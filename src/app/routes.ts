import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DispenseAppComponent } from './components/dispense-app/dispense-app.component';
import { StoreSelectComponent } from './components/store-select/store-select.component';
import { StockComponent } from './components/stock/stock.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ImportDispensedComponent } from './components/import-dispensed/import-dispensed.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',

    component: StoreSelectComponent,
  },
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'dispense',
        component: DispenseAppComponent,
      },
      {
        path: 'stock',
        component: StockComponent,
      },
      {
        path: 'report',
        component: ReportsComponent,
      },
      {
        path: 'import',
        component: ImportDispensedComponent,
      },
    ],
  },
];
