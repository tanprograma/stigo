import { Component, inject, OnInit } from '@angular/core';
import { InventoryItem, StockItem } from 'src/app/interfaces';
import { AppService } from 'src/app/services/app.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { TransformerService } from 'src/app/services/transformer.service';
import { Sale } from 'src/app/interfaces/sale';
import { TransactionItem } from 'src/app/interfaces/transaction-item';
import { Product } from 'src/app/interfaces/product';
@Component({
  selector: 'app-dispense-app',
  templateUrl: './dispense-app.component.html',
  styleUrls: ['./dispense-app.component.css'],
})
export class DispenseAppComponent implements OnInit {
  icon = faArrowDown;
  date = '';
  loading = false;
  message = '';

  inventory: InventoryItem[] = [];
  items: {
    commodity: string;
    quantity: number;
    date: number;
    client: string;
  }[] = [];
  submitted = 0;
  prescriptions = 0;
  transformer = inject(TransformerService);
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.getInventory();
  }
  getInventory() {
    this.loading = true;
    this.inventory = this.app.inventory;
    this.message = 'initializing data';
    if (this.app.stock.length > 0) this.inventory = this.app.stock;
    this.app.getStock().subscribe((inv) => {
      const transformed = this.transformer.transformData(inv, [], [], []);
      this.app.stock = transformed;
      this.inventory = transformed;
      this.loading = false;
    });
  }
  clearPrescription() {
    this.items = [];
  }
  add(item: { commodity: string; quantity: number }) {
    if (this.date.length == 0) return;
    const found = this.items.find((i) => {
      return i.commodity == item.commodity;
    });
    if (found != undefined) {
      this.items = this.items.map((z) => {
        return z.commodity == item.commodity
          ? { ...z, quantity: z.quantity + item.quantity }
          : z;
      });
      return;
    }
    this.items.push({
      ...item,
      date: new Date(this.date).getTime(),
      client: this.app.outlet.name,
    });
  }
  remove(item: { commodity: string; quantity: number }) {
    this.items = this.items.filter((i) => {
      return i != item;
    });
  }
  submit() {
    this.loading = true;
    this.message = 'uploading dispense data';
    this.app
      .dispenseNew(this.items)
      .subscribe((result: { status: boolean; res: Sale }) => {
        console.log({ result });
        this.loading = false;
        if (result.res.products.length > 0) {
          this.submitted += result.res.products.length;
          // modifies stock
          this.app.stock = this.app.stock.map((item) => {
            const found = result.res.products.find((p: TransactionItem) => {
              return item.commodity == (p.product as Product).name;
            });
            return found == undefined
              ? item
              : { ...item, stock: item.stock - found.quantity };
          });
          if (result.res.products.length == this.items.length) {
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
