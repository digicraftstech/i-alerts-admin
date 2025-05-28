import ROUTES from './routes';

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

export const API_BASE_URL = 'http://20.244.12.56:9725';
export const IALERTS_TOKEN =
  'BchIC/Fm0YwxfUblCVV3Wbgt7aTi9alCI/iFzMTyvhbEaUrloq85Ig==';
