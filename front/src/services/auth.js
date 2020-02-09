export const TOKEN_KEY = "@sesmer-Token";
export const CART_KEY = "@sesmer-Cart";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const cart = (value) => localStorage.setItem(CART_KEY, value);
export const restartCart = () => localStorage.removeItem(CART_KEY);
export const getLocalCart = () => localStorage.getItem(CART_KEY);