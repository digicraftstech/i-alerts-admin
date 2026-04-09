export const BaseURL = process.env.API_BASE_URL;
export const iAlertsToken = process.env.IALERTS_TOKEN;

export const APIScalesURL = `${BaseURL}/scales`;
export const APIProductsURL = `${BaseURL}/products`;
export const APIRegisterURL = `${BaseURL}/register`;

export const PAGE_REFRESH_INTERVAL = 60000;

export const ROW_OPTIONS = [
  { label: 'Front', value: '1' },
  { label: 'Center', value: '2' },
  { label: 'Back', value: '3' },
];

export const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HOME: '/',
  CATALOG: '/product',
  STORE: '/store',
  SCALE: (id: string) => `/scales/${id}`,
  ADD_SCALE: '/add-scale',
  ADD_PRODUCT: '/add-product',
};

export const sideBarLinks = [
  {
    imgURL: '/icons/home.svg',
    label: 'Home',
    route: ROUTES.HOME,
  },
  {
    imgURL: '/icons/add-scale.svg',
    label: 'Add a Scale',
    route: ROUTES.ADD_SCALE,
  },
  {
    imgURL: '/icons/catalog.svg',
    label: 'Product Catalog',
    route: ROUTES.CATALOG,
  },
  {
    imgURL: '/icons/add-product.svg',
    label: 'Add a Product',
    route: ROUTES.ADD_PRODUCT,
  },

  {
    imgURL: '/icons/store.svg',
    label: 'Store Details',
    route: ROUTES.STORE,
  },
];
