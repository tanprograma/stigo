import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() created!: number;
  current = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
