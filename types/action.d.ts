export interface CreateProductParams {
  product_name: string;
  product_plu: number;
  image: string;
}

export interface CreateScaleParams {
  ss_uid: string;
  oem_name: string;
  model_name: string;
  // placement?: {
  //   allocation_weight?: number;
  //   threshold_weight?: number;
  //   weight_unit?: 'lbs' | 'kg';
  //   product_id?: string;
  // };
  // location?: {
  //   location_name?: string;
  //   row?: number;
  //   fixture_no?: string;
  // };
}

export interface UpdateScaleLocationParams {
  location: {
    location_name?: string;
    row?: number;
    fixture_no?: number;
  };
}

export interface UpdateScaleProductParams {
  placement?: {
    product_id?: string;
    allocation_weight?: number;
    threshold_weight?: number;
    weight_unit?: 'lbs' | 'kg';
  };
}
