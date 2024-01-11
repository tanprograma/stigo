import { Component, Input, OnInit } from '@angular/core';
import { ReducedStatistic, StatisticItem } from 'src/app/interfaces';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  @Input() currentStatistics!: StatisticItem[];
  constructor() {}

  ngOnInit(): void {}
  reduceCurrentStatistics(): ReducedStatistic[] {
    return Object.values(
      this.currentStatistics.reduce((cum: Signature, curr: StatisticItem) => {
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
}
class Signature {
  [item: string]: ReducedStatistic;
}
