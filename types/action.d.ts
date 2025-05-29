export interface CreateProductParams {
  product_name: string;
  product_plu: string;
  image: string;
  weight_unit: 'lbs' | 'kg';
}
