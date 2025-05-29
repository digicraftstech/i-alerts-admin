import { NextResponse } from 'next/server';

type Scale = {
  ss_id: string;
  ss_unique_name: string;
  last_reading: number;
  last_reading_datetime: string;
  threshold_weight: number;
  allocation_weight: number;
  status: string;
  product: Product;
  location: ScaleLocation;
  alert: Alert;
};

type Product = {
  product_id: string;
  product_name: string;
  product_plu: number;
  image: string;
  weight_unit: string;
};

type ScaleLocation = {
  map_id: string;
  location_name: string;
  row: number;
  fixture_no: string;
};

type Reading = {
  record_id: string;
  weight_reading: number;
  reading_datetime: string;
};

type Alert = {
  alert_raised_datetime: string;
  alert_ack_datetime: string;
  alert_addressed_datetime: string;
};

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details: Record<string, string[]>;
  };
  status: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse<T = null> = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse = NextResponse<SuccessResponse<T> | ErrorResponse>;
