import { adminInstance, instance } from "./axiosInstance";

/**
 * Inscrit un nouvel utilisateur en envoyant une requête POST à l'API.
 *
 * @async
 * @function singup
 * @param {Object} user - Les informations de l'utilisateur à inscrire.
 * @param {string} user.email - L'adresse email de l'utilisateur.
 * @param {string} user.username - Le nom d'utilisateur.
 * @param {string} user.password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} La réponse de l'API après l'inscription de l'utilisateur.
 * @throws {Error} Si la requête échoue, une erreur est renvoyée.
 */
export async function singup(user) {
   const response = await instance.post("signup/", user);
   return response;
}

/**
 * Connecte un utilisateur en envoyant une requête POST à l'API.
 *
 * @async
 * @function login
 * @param {Object} credentials - Les informations de connexion de l'utilisateur.
 * @param {string} credentials.email - L'adresse email de l'utilisateur.
 * @param {string} credentials.password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} La réponse de l'API après la connexion de l'utilisateur.
 * @throws {Error} Si la requête échoue, une erreur est renvoyée.
 */
export async function login(credentials) {
    const response = await instance.post("login/", credentials);
    return response;
}

/**
 * Déconnecte l'utilisateur en envoyant une requête POST à l'API.
 *
 * @async
 * @function logout
 * @returns {Promise<Object>} La réponse de l'API après la déconnexion de l'utilisateur.
 * @throws {Error} Si la requête échoue, une erreur est renvoyée.
 */
export async function logout() {
    const response = await adminInstance.post("logout/", {});
    return response;
}
