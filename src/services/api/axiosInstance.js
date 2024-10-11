import axios from "axios";
import { getUser } from "../session/session";

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Instance d'axios avec la configuration de base pour l'application.
 * @type {AxiosInstance}
 */
export const instance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

/**
 * Instance d'axios avec la configuration de base pour les requêtes d'administration.
 * @type {AxiosInstance}
 */
export const adminInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

/**
 * Intercepteur pour ajouter le token d'authentification aux requêtes d'administration.
 * Cet intercepteur ajoute un en-tête 'Authorization' avec le token de l'utilisateur.
 */
adminInstance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Token ${getUser()?.token.trim()}`;
    return request;
  },
  (error) => {
    if (error.response) {
      const apiError = error.response?.data;
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);
