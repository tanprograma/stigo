import { Component, OnInit } from '@angular/core';
import {
  InventoryItem,
  StatisticItem,
  StatisticType,
  StockItem,
} from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';

type ViewType = 'summary' | 'detailed';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  viewType: ViewType = 'summary';
  statisticType: StatisticType = 'dispensed';
  statistics: StatisticItem[] = [];
  currentStatistics: StatisticItem[] = [];
  // search query
  query = '';
  // search date
  date: { begin: string; end: string } = { begin: '', end: '' };
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  setStatistic(i: StatisticType) {
    this.statisticType = i;
    this.currentStatistics = this.statistics.filter((s) => {
      return s.voucher == this.statisticType;
    });
  }
  // inializes data
  getStatistics() {
    this.app.getStock().subscribe((stock) => {
      this.statistics = this.reduceStatistics(stock);
      this.currentStatistics = this.statistics.filter((s) => {
        return s.voucher == this.statisticType;
      });
      console.log({ curr: this.currentStatistics });
    });
  }
  // creates one list of statistics items from all stock
  reduceStatistics(stock: InventoryItem[]) {
    return stock.reduce((cum: StatisticItem[], curr: InventoryItem) => {
      return [...cum, ...this.mapStatistic(curr)];
    }, []);
  }
  // maps stockItem to statisticItems
  mapStatistic(data: InventoryItem) {
    const dispense: StatisticType = 'dispensed';
    const receive: StatisticType = 'received';
    const issue: StatisticType = 'issued';

    const dispensed = data.dispensed.map((item) => {
      return { ...item, voucher: dispense, commodity: data.commodity };
    });
    const received = data.received.map((item) => {
      return { ...item, voucher: receive, commodity: data.commodity };
    });
    const issued = data.issued.map((item) => {
      return { ...item, voucher: issue, commodity: data.commodity };
    });
    return [...dispensed, ...issued, ...received];
  }
}
