const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HOME: '/',
  CATALOG: '/catalog',
  STORE: '/store',
  SCALE: (id: string) => `/scales/${id}`,
};

export default ROUTES;
