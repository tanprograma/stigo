import { Component, inject, OnInit } from '@angular/core';
import { StockItem } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';
import { TransformerService } from 'src/app/services/transformer.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  constructor(public app: AppService) {}
  loading = false;
  message = 'getting stock data';
  stock: StockItem[] = [];
  displayed: StockItem[] = [];
  transformer = inject(TransformerService);
  ngOnInit(): void {
    this.loading = true;
    this.app.getStock().subscribe((s) => {
      const transformed = this.transformer.transformData(s, [], [], []);

      this.stock = transformed;
      this.displayed = this.stock;
      this.loading = false;
    });
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
    this.displayed = this.stock.filter((item) => {
      const regex = new RegExp(query, 'i');
      return regex.test(item.commodity);
    });
  }
}
