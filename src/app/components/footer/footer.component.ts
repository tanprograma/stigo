import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() created!: number;
  current = new Date().getFullYear();
  dedication = '';
  interval: any = '';
  dedications = [
    'made with &#10084 by PharmaBro',
    'special thanks to Diana',
    'much thanks to shindai',
    'big up MO wa Lab',
    "love ya'all",
  ];
  constructor() {}
  setDedication() {
    let index = 0;
    this.interval = setInterval(() => {
      this.dedication = this.dedications[index];
      if (index == this.dedications.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }, 3000);
  }

  ngOnInit(): void {
    this.setDedication();
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
