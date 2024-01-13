import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DispenseAppComponent } from './components/dispense-app/dispense-app.component';
import { StoreSelectComponent } from './components/store-select/store-select.component';
import { DispenseFormComponent } from './components/dispense-form/dispense-form.component';
import { PrescriptionItemsComponent } from './components/prescription-items/prescription-items.component';

import { DispenseItemsComponent } from './components/dispense-items/dispense-items.component';
import { StockComponent } from './components/stock/stock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportsComponent } from './components/reports/reports.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { StatisticReportComponent } from './components/statistic-report/statistic-report.component';
import { StatisticReportDetailedComponent } from './components/statistic-report-detailed/statistic-report-detailed.component';
import { DatesComponent } from './components/dates/dates.component';
import { ImportDispensedComponent } from './components/import-dispensed/import-dispensed.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainHeaderComponent,
    FooterComponent,
    DispenseAppComponent,
    StoreSelectComponent,
    DispenseFormComponent,
    PrescriptionItemsComponent,

    DispenseItemsComponent,
    StockComponent,
    ReportsComponent,
    StatisticComponent,
    StatisticReportComponent,
    StatisticReportDetailedComponent,
    DatesComponent,
    ImportDispensedComponent,
    FileInputComponent,
    LoaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
