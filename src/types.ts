export interface Product {
  id: string;
  name: string;
  category: 'robux' | 'fisch' | 'wholesale';
  originalPrice: number; // base value (e.g. in currency / points)
  robuxPrice?: number; // Robux value
  image: string;
  isFeatured: boolean;
  stock: number;
}

export interface FunnelMetric {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ChurnMetric {
  username: string;
  lastActiveDays: number;
  risk: 'High' | 'Medium' | 'Low';
  lastTransaction: string;
  savedByCoupon?: boolean;
}

export interface WebhookLog {
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  message: string;
}
