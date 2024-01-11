import { Component, Input, OnInit } from '@angular/core';
import { StatisticItem } from 'src/app/interfaces';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-statistic-report-detailed',
  templateUrl: './statistic-report-detailed.component.html',
  styleUrls: ['./statistic-report-detailed.component.css'],
})
export class StatisticReportDetailedComponent implements OnInit {
  @Input() statistics!: StatisticItem[];
  icon = faRecycle;

  constructor() {}

  ngOnInit(): void {}

  getDate(s: StatisticItem) {
    return new Date(s.date).toLocaleDateString().replaceAll('/', '-');
  }
  getTime(s: StatisticItem) {
    return new Date(s.date).toLocaleTimeString();
  }
}
