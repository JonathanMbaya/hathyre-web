const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

/**
 * Enregistre l'utilisateur connecté en stockage de session.
 *
 * @function setLoggedUser
 * @param {Object} data - Les informations de l'utilisateur à enregistrer.
 * @param {string} data.token - Le token d'authentification de l'utilisateur.
 * @param {Object} data.user - Les informations de l'utilisateur.
 * @param {string} data.user.id - L'identifiant de l'utilisateur.
 * @param {string} data.user.username - Le nom d'utilisateur.
 */
export const setLoggedUser = (data) => {
   if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));
   }
};

/**
 * Récupère les informations de l'utilisateur connecté depuis le stockage de session.
 *
 * @function getUser
 * @returns {Object|null} Les informations de l'utilisateur connecté ou null s'il n'est pas trouvé.
 * @returns {string} [return.token] - Le token d'authentification de l'utilisateur.
 * @returns {Object} [return.user] - Les informations de l'utilisateur.
 * @returns {string} [return.user.id] - L'identifiant de l'utilisateur.
 * @returns {string} [return.user.username] - Le nom d'utilisateur.
 */
export const getUser = () => {
   if (typeof sessionStorage !== "undefined") {
      return JSON.parse(sessionStorage.getItem(TOKEN_KEY));
   }
   return null;
};

/**
 * Supprime les informations de l'utilisateur connecté du stockage de session.
 *
 * @function removeUser
 */
export const removeUser = () => {
   if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);
   }
};
