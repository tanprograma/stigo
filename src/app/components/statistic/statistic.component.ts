import { Component, Input, OnInit } from '@angular/core';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { ReducedStatistic, StatisticItem, StockItem } from 'src/app/interfaces';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  @Input() statistics!: StatisticItem[];

  @Input() detailed!: boolean;

  icon = faRecycle;
  constructor() {}

  ngOnInit(): void {}
  reduceCurrentStatistics(): ReducedStatistic[] {
    return Object.values(
      this.statistics.reduce((cum: Signature, curr: StatisticItem) => {
        const { commodity, quantity } = curr;
        if (cum[commodity] != undefined) {
          cum[commodity].quantity += quantity;
          return cum;
        }
        cum[commodity] = { commodity, quantity };
        return cum;
      }, new Signature())
    );
  }

  getDate(s: StatisticItem) {
    return new Date(s.date).toLocaleDateString().replaceAll('/', '-');
  }
  getTime(s: StatisticItem) {
    return new Date(s.date).toLocaleTimeString();
  }
}
class Signature {
  [item: string]: ReducedStatistic;
}
