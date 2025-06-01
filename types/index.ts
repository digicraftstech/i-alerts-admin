export interface RegisterDeviceParams {
  device_id: string;
  device_name: string;
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}
