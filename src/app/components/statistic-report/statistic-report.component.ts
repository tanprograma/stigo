import { Component, Input, OnInit } from '@angular/core';
import { StockItem } from 'src/app/interfaces';

@Component({
  selector: 'app-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.css'],
})
export class StatisticReportComponent implements OnInit {
  @Input() displayed!: StockItem[];
  constructor() {}

  ngOnInit(): void {}
  approximateStock(item: StockItem) {
    return Math.floor(item.stock / item.unit_value);
  }
  getExpiry(s: StockItem) {
    if (s.expiry == undefined) return '';
    return new Date(s.expiry).toLocaleDateString();
  }
}
