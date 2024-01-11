import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockItem } from 'src/app/interfaces';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent implements OnInit {
  @Input() date!: string;
  @Output() dateChange = new EventEmitter<string>();
  changeDate() {
    this.dateChange.emit(this.date);
  }

  @Output() onAdd = new EventEmitter<
    { commodity: string; quantity: number }[]
  >();
  medicine = '';

  medicines: { commodity: string }[] = [];
  quantity: string = '0';
  item: StockItem | null | undefined = null;
  constructor() {}
  filename = '';
  success = false;
  ngOnInit(): void {}
  add(input: HTMLInputElement) {
    input.click();
    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.filename = target?.files?.[0].name || '';
      this.success = true;
    });
  }
  parseData(input: HTMLInputElement) {
    if (input.files != null) {
      // const blob = new Blob([input.files[0]]);
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        const result = reader.result as string;
        const items = result
          .split('\r\n')
          .filter((i) => {
            return i.length > 0;
          })
          .map((i) => {
            return i.split(',');
          });

        const data = items.splice(1);

        const mapped = data.map((i) => {
          const [commodity, quantity] = i;
          return { commodity, quantity: parseInt(quantity) };
        });
        this.onAdd.emit(mapped);
        console.log(items);
        this.success = false;
      };
    }
  }
}
