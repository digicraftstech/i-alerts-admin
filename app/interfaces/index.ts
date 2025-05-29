export interface IAlert {
  ad_id: string;
  alert_raised_datetime: string;
  alert_ack_datetime: string;
}
export interface IScale {
  ss_id: number;
  ss_uid: number;
  ss_unique_name: string;
  model_name: string;
  oem_name: string;
  last_reading: number;
  last_reading_datetime: Date;
  threshold_weight: number;
  allocation_weight: number;
  weight_unit: 'kg' | 'lbs';
  status: null | string;
  product: null | IProduct;
  location: null | ILocation;
  alert: null | IAlert;
}

export interface IProduct {
  image: string;
  product_id: string;
  product_name: string;
  product_plu: number;
  weight_unit: 'kg' | 'lbs';
}

export interface ILocation {
  row: number;
  location_name: string;
  fixture_no: number;
}

export interface INotification {
  ad_id: number;
  title: string;
  message: string;
  status: 'sent';
  response_id: string;
  error: null;
  alert_ack_datetime: null;
  alert_addressed_datetime: null;
  alert_raised_datetime: string;
  scale: IScale;
}
