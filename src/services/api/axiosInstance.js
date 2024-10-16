import axios from "axios";
import { getUser } from "../session/session.js";

const BASE_URL = "https://hathyre-server-api.onrender.com/api";

// https://hathyre-server-api.onrender.com/api

/**
 * Instance d'axios avec la configuration de base pour l'application.
 * @type {AxiosInstance}
 */
export const instance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   timeout: 5000, // 5 secondes de délai d'attente
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
