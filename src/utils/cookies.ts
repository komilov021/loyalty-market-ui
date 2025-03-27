import Cookies from "js-cookie";

const accessTokenKey = "loyalty_access_token";
// cookies;
export const getAccessToken = () => Cookies.get(accessTokenKey);
export const setAccessToken = (token: string) => {
  Cookies.set(accessTokenKey, token);
};
export const removeAccessToken = () => Cookies.remove(accessTokenKey);
