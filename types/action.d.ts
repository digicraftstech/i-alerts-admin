export interface CreateProductParams {
  product_name: string;
  product_plu: number;
  image: string;
  weight_unit: 'lbs' | 'kg';
}

export interface CreateScaleParams {
  ss_uid: string;
  oem_name: string;
  model_name: string;
}
