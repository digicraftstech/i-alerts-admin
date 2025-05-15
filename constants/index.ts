import ROUTES from './routes';

export const sideBarLinks = [
  {
    imgURL: '/icons/home.svg',
    label: 'Home',
    route: ROUTES.HOME,
  },
  {
    imgURL: '/icons/catalog.svg',
    label: 'Catalog',
    route: ROUTES.CATALOG,
  },
  {
    imgURL: '/icons/store.svg',
    label: 'Store Details',
    route: ROUTES.STORE,
  },
];

export const API_BASE_URL = 'http://20.244.12.56:9725';
