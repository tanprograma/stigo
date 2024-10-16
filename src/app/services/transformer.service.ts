import { Injectable } from '@angular/core';
import { Outlet } from '../interfaces';
import { InventoryItem } from '../interfaces';
import { Inventory } from '../interfaces/inventory';
import { Sale } from '../interfaces/sale';
import { Transfer } from '../interfaces/request';
import { Store } from '../interfaces/store';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class TransformerService {
  constructor() {}
  transformData(
    inventory: Inventory[],
    sales: Sale[],
    received: Transfer[],
    issued: Transfer[]
  ): InventoryItem[] {
    const items = inventory.reduce((cum, cur: Inventory) => {
      cum[(cur.product as Product).name] = {
        outlet: (cur.store as Store).name,
        commodity: (cur.product as Product).name,
        stock: cur.quantity,
        unit: this.getLargestUnit(cur.product).name,
        unit_value: this.getLargestUnit(cur.product).value,
        expiry: '12/12/2025',
        dispensed: [],
        received: [],
        issued: [],
      };

      return cum;
    }, new this.accumulator());
    return Object.values(items);
  }
  //   InventoryItem {
  //   outlet: string;
  //   commodity: string;
  //   stock: number;
  //   unit: string;
  //   unit_value: number;
  //   expiry: string;
  //   dispensed: { quantity: number; date: number; client: string }[];
  //   received: { quantity: number; date: number; client: string }[];
  //   issued: { quantity: number; date: number; client: string }[];
  // }
  accumulator = class {
    [product: string]: InventoryItem;
  };
  getLargestUnit(product: Product | string) {
    return (product as Product).units.sort((a: any, b: any) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    })[0];
  }
  getSmallestUnit(product: Product | string) {
    return (product as Product).units.sort((a: any, b: any) => {
      if (a.value > b.value) return 1;
      if (a.value < b.value) return -1;
      return 0;
    })[0];
  }
}
