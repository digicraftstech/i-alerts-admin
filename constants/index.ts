import ROUTES from './routes';

export const BaseURL = process.env.API_BASE_URL;
export const iAlertsToken = process.env.IALERTS_TOKEN;

export const APIScalesURL = `${BaseURL}/scales`;
export const APIProductsURL = `${BaseURL}/products`;
export const APIREgisterURL = `${BaseURL}/register`;

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
