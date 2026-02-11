const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HOME: '/',
  CATALOG: '/product',
  STORE: '/store',
  SCALE: (id: string) => `/scales/${id}`,
  CALIBRATE: (id: string) => `/scales/${id}/calibrate`,
  ADD_SCALE: '/add-scale',
  ADD_PRODUCT: '/add-product',
};

export default ROUTES;
