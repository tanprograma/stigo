export interface StatisticsSummary {
  product: string;
  category: string;
  unit: string;
  unit_value: number;
  quantity: number;
  purchased: number;
  dispensed: number;
  expired?: number;
}
