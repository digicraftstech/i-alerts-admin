import ROUTES from './routes';

// export const API_BASE_URL = 'http://20.244.12.56:9725';
// export const IALERTS_TOKEN =
//   'BchIC/Fm0YwxfUblCVV3Wbgt7aTi9alCI/iFzMTyvhbEaUrloq85Ig==';

export const SERVER_URL = 'http://98.70.27.104:9725';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || SERVER_URL;
export const IALERTS_TOKEN =
  '5xzmZPP1cBuRpSJA31ADtHVErAjMiU7foGL81na5zzSOI0KKLVLM0g==';
export const API_SCALES_URL = `${API_BASE_URL}/scales`;
export const API_PRODUCTS_URL = `${API_BASE_URL}/products`;
export const API_REGISTER_URL = `${API_BASE_URL}/register`;

export const sideBarLinks = [
  {
    imgURL: '/icons/home.svg',
    label: 'Home',
    route: ROUTES.HOME,
  },
  {
    imgURL: '/icons/catalog.svg',
    label: 'Product Catalog',
    route: ROUTES.CATALOG,
  },

  {
    imgURL: '/icons/store.svg',
    label: 'Store Details',
    route: ROUTES.STORE,
  },
  {
    imgURL: '/icons/add-scale.svg',
    label: 'Add a Scale',
    route: ROUTES.ADD_SCALE,
  },
  {
    imgURL: '/icons/add-product.svg',
    label: 'Add a Product',
    route: ROUTES.ADD_PRODUCT,
  },
];
