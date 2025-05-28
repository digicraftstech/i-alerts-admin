const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HOME: '/',
  CATALOG: '/catalog',
  STORE: '/store',
  SCALE: (id: string) => `/scales/${id}`,
  ADD_SCALE: '/add-scale',
  ADD_PRODUCT: '/add-product',
};

export default ROUTES;
