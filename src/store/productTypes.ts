export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  total: number;
  limit: number;
  skip: number;
  error: string | null;
  listLoading: boolean;
  detailLoading: boolean;
}
