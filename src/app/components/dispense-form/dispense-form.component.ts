import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StockItem } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dispense-form',
  templateUrl: './dispense-form.component.html',
  styleUrls: ['./dispense-form.component.css'],
})
export class DispenseFormComponent implements OnInit {
  @Input() date!: string;
  @Output() dateChange = new EventEmitter<string>();

  @Output() onAdd = new EventEmitter<{ commodity: string; quantity: number }>();
  medicine = '';

  medicines: { commodity: string }[] = [];
  quantity: string = '0';
  item: StockItem | null | undefined = null;
  constructor(public app: AppService) {}

  ngOnInit(): void {}
  clear() {
    this.medicine = '';
    this.quantity = '0';
    this.item = null;
  }
  getAvailable() {
    const n = this.app.stock.find((i) => {
      return i.commodity == this.medicine;
    });

    if (n != undefined) {
      this.item = n;
    }
  }
  add() {
    if (this.date.length == 0) {
      return;
    }
    this.onAdd.emit({
      commodity: this.medicine,
      quantity: parseInt(this.quantity),
    });
    this.clear();
  }
  changeDate() {
    this.dateChange.emit(this.date);
  }
}
