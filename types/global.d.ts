type Scale = {
  ss_id: string;
  ss_unique_name: string;
  last_reading: number;
  last_reading_datetime: string;
  threshold_weight: number;
  allocation_weight: number;
  status: string;
  product: Product;
};

type Product = {
  product_id: string;
  product_name: string;
  product_plu: number;
  image: string;
  weight_unit: string;
};
