import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatisticItem } from 'src/app/interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  @Output() onFilter = new EventEmitter<{
    query: string;
    date: { begin: string; end: string };
  }>();
  filterCriterion: {
    query: string;
    date: { begin: string; end: string };
  } = {
    query: '',
    date: { begin: '', end: '' },
  };

  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}
  // searching functionalities
  reset() {
    this.filterCriterion = {
      query: '',
      date: { begin: '', end: '' },
    };
    this.onFilter.emit(this.filterCriterion);
  }
  onSearch() {
    this.onFilter.emit(this.filterCriterion);
  }
  
}
