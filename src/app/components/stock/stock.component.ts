import { Component, OnInit } from '@angular/core';
import { StockItem } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  constructor(public app: AppService) {}
  displayed: StockItem[] = [];

  ngOnInit(): void {
    this.app.getStock();
    this.initialize();
  }
  initialize() {
    const i = setInterval(() => {
      if (this.app.stock.length > 0) {
        this.displayed = this.app.stock;
        clearInterval(i);
      }
    });
  }
  approximateStock(item: StockItem) {
    return Math.floor(item.stock / item.unit_value);
  }
  search(query: string) {
    this.displayed = this.app.stock.filter((item) => {
      const regex = new RegExp(query, 'i');
      return regex.test(item.commodity);
    });
  }
}
