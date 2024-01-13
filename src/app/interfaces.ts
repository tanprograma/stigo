export interface Outlet {
  name: string;
  _id?: string;
  isWarehouse: boolean;
}
export interface StockItem {
  commodity: string;
  unit: string;
  unit_value: number;
  stock: number;
  expiry: Date | string;
}
export type StatisticType = 'dispensed' | 'received' | 'issued';
export interface StatisticItem {
  commodity: string;
  quantity: number;
  date: number;
  client: string;
  voucher: StatisticType;
}
export interface InventoryItem {
  outlet: string;
  commodity: string;
  stock: number;
  unit: string;
  unit_value: number;
  expiry: string;
  dispensed: { quantity: number; date: number; client: string }[];
  received: { quantity: number; date: number; client: string }[];
  issued: { quantity: number; date: number; client: string }[];
}
export interface ReducedStatistic {
  commodity: string;
  quantity: number;
}
export interface User {
  username: string;
  password?: string;
  role?: string;
}
export interface LoginRes {
  result: { username: string; role: string } | null;
  error: string | null;
}
