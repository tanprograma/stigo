import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dispense-items',
  templateUrl: './dispense-items.component.html',
  styleUrls: ['./dispense-items.component.css'],
})
export class DispenseItemsComponent implements OnInit {
  @Input() items!: { commodity: string; quantity: number }[];
  @Output() onDelete = new EventEmitter<{
    commodity: string;
    quantity: number;
  }>();
  constructor() {}

  ngOnInit(): void {}
  removeItem(item: { commodity: string; quantity: number }) {
    this.onDelete.emit(item);
  }
}
