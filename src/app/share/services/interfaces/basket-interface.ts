interface BasketItem {
  id: number;
  user_id: number;
  product_id: number;
  count: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  images: string | null;
  region_id: number;
  salesman_id: number;
  category_id: number;
  characteristics: string;
  prevImg:string;
  created_at: string;
  updated_at: string;
  totalPrice:string
}

export interface BasketData {
  basket: BasketItem[];
  total: number;
  totalPrice:string
}
