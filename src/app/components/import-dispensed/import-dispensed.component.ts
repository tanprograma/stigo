import { Component, inject, OnInit } from '@angular/core';
import { InventoryItem, StockItem } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { TransformerService } from 'src/app/services/transformer.service';
@Component({
  selector: 'app-import-dispensed',
  templateUrl: './import-dispensed.component.html',
  styleUrls: ['./import-dispensed.component.css'],
})
export class ImportDispensedComponent implements OnInit {
  icon = faArrowDown;
  date = '';
  inventory: InventoryItem[] = [];
  items: {
    commodity: string;
    quantity: number;
    date: number;
    client: string;
  }[] = [];
  submitted = 0;
  prescriptions = 0;
  loading = false;
  message = '';
  transformer = inject(TransformerService);
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.getInventory();
  }
  getInventory() {
    this.loading = true;
    this.message = 'initializing the app';
    if (this.app.stock.length > 0) this.inventory = this.app.stock;
    this.app.getStock().subscribe((inv) => {
      const transformed = this.transformer.transformData(inv, [], [], []);
      this.app.stock = transformed;
      this.inventory = transformed;
      this.loading = false;
    });
  }
  clearPrescription() {
    this.date = '';
    this.items = [];
  }
  add(items: { commodity: string; quantity: number }[]) {
    if (this.date.length == 0) return;

    this.items = [
      ...this.items,
      ...items.map((i) => {
        return {
          ...i,
          date: new Date(this.date).getTime(),
          client: this.app.outlet.name,
        };
      }),
    ];
  }
  remove(item: { commodity: string; quantity: number }) {
    this.items = this.items.filter((i) => {
      return i != item;
    });
  }
  submit() {
    this.loading = true;
    this.message = 'uploading the dispense data';
    this.app.dispense(this.items).subscribe((result) => {
      this.loading = false;
      if (result.length > 0) {
        this.submitted += result.length;
        // modifies stock
        result.forEach((r) => {
          this.app.stock = this.app.stock.map((item) => {
            if (r.commodity == item.commodity && r.outlet == item.outlet) {
              return r;
            }
            return item;
          });
        });
        if (result.length == this.items.length) {
          this.prescriptions += 1;

          this.clearPrescription();
        }
      }
    });
  }
  // array to csv
  arrayToCsv(data: { commodity: string; quantity: number }[]) {
    const stringData = data.map((i) => {
      return [...Object.values(i)];
    });
    return stringData
      .map(
        (row) =>
          row
            .map(String) // convert every value to String
            .map((v) => v.replaceAll('"', '""')) // escape double quotes
            .map((v) => `"${v}"`) // quote it
            .join(',') // comma-separated
      )
      .join('\r\n'); // rows starting on new lines
  }
  downloadCSV() {
    const date = this.date.replaceAll('/', '-');
    const filename = 'dispensed-' + date;
    const csv = this.arrayToCsv(this.items);
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);

    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }
}
