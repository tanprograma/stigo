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
  loading = false;
  message = 'getting data...';
  detailed = false;
  statisticType: StatisticType = 'dispensed';
  statistics: StatisticItem[] = [];
  currentStatistics: StatisticItem[] = [];
  title = '';
  setTitle(date: { begin: string; end: string }) {
    if (date.begin == '' && date.end == '') return '';
    if (date.begin == '' && date.end != '') {
      return `UNTIL ${date.end}`;
    }
    if (date.begin != '' && date.end == '') {
      return `FROM ${date.begin}`;
    }

    return `FROM ${date.begin} UNTIL ${date.end}`;
  }
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.getStatistics();
  }
  toggleView() {
    this.detailed = !this.detailed;
  }
  setStatistic(i: StatisticType) {
    this.statisticType = i;
    this.currentStatistics = this.statistics.filter((s) => {
      return s.voucher == this.statisticType;
    });
  }
  // inializes data
  getStatistics() {
    this.loading = true;
    this.initStatistics(this.app.inventory);
    this.app.getStock().subscribe((stock) => {
      this.initStatistics(stock);
      this.loading = false;
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

  initStatistics(stock: InventoryItem[]) {
    this.statistics = this.reduceStatistics(stock);
    this.currentStatistics = this.statistics.filter((s) => {
      return s.voucher == this.statisticType;
    });
  }
  search({
    date,
    query,
  }: {
    query: string;
    date: { begin: string; end: string };
  }) {
    this.title = this.setTitle(date);
    this.currentStatistics = this.statistics
      .filter((i) => {
        return i.voucher == this.statisticType;
      })
      .filter((item) => {
        if (query == '') return true;
        const regex = new RegExp(query, 'i');
        return regex.test(item.commodity);
      })
      .filter((i) => {
        if (date.begin == '') return true;
        const d = new Date(date.begin).getTime();
        return i.date >= d;
      })
      .filter((i) => {
        if (date.end == '') return true;
        const d = new Date(date.end);
        const newd = d.setDate(d.getDate() + 1) - 1;
        return i.date <= newd;
      });
  }
  // test item date against component date
  filterByDate(date: number, d: { begin: string; end: string }) {
    if (d.begin.length > 0 && d.end == '') {
      const begin = new Date(d.begin).getTime();

      return date >= begin;
    }
    if (d.end.length > 0 && d.begin == '') {
      const end = new Date(d.end).getTime();

      return date <= end;
    }
    if (d.end.length > 0 && d.begin.length > 0) {
      const begin = new Date(d.begin).getTime();
      const end = new Date(d.end).getTime();

      return date >= begin && date <= end;
    }

    return true;
  }
}
