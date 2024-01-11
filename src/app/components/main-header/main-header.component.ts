import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  constructor(private app: AppService) {}
  outlet = '';
  ngOnInit(): void {
    this.outlet = this.app.outlet.name;
  }
}
