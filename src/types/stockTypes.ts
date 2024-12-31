export interface Stock {
  id: number;
  userId: number;
  ticker: string;
  name: string | null;
  type: string | null;
  region: string | null;
  currency: string | null;
  createdAt: Date;
}

export interface DetailedStock extends Stock {
  open: number | null;
  high: number | null;
  low: number | null;
  price: number | null;
  volume: number | null;
  change: number | null;
  changePercent: string | null;
}
