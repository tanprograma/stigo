import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatisticItem } from 'src/app/interfaces';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  @Input() currentStatistics!: StatisticItem[];
  @Output() currentStatisticsChange = new EventEmitter<StatisticItem[]>();
  @Input() statistics!: StatisticItem[];
  date: { begin: string; end: string } = { begin: '', end: '' };
  query = '';

  constructor() {}

  ngOnInit(): void {}
  // searching functionalities
  search() {
    this.currentStatistics = this.statistics.filter((item) => {
      const regex = new RegExp(this.query, 'i');
      return regex.test(item.commodity) && this.filterByDate(item.date);
    });

    this.currentStatisticsChange.emit(this.currentStatistics);
  }
  // test item date against component date
  filterByDate(date: number) {
    if (this.date.begin.length > 0 && this.date.end == '') {
      const begin = new Date(this.date.begin).getTime();

      return date >= begin;
    }
    if (this.date.end.length > 0 && this.date.begin == '') {
      const end = new Date(this.date.end).getTime();

      return date <= end;
    }
    if (this.date.end.length > 0 && this.date.begin.length > 0) {
      const begin = new Date(this.date.begin).getTime();
      const end = new Date(this.date.end).getTime();

      return date >= begin && date <= end;
    }

    return true;
  }
}
