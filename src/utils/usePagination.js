import { useMemo } from 'react';

/**
 * Génère une plage de nombres entre une valeur de départ et une valeur de fin.
 *
 * @function range
 * @param {number} start - Valeur de départ.
 * @param {number} end - Valeur de fin.
 * @returns {number[]} Tableau de nombres entre start et end, inclus.
 */
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Hook personnalisé pour gérer la pagination.
 *
 * @function usePagination
 * @param {Object} params - Paramètres pour la pagination.
 * @param {number} params.totalCount - Nombre total d'éléments.
 * @param {number} params.pageSize - Nombre d'éléments par page.
 * @param {number} [params.siblingCount=1] - Nombre de pages voisines à afficher de chaque côté de la page courante.
 * @param {number} params.currentPage - Page courante.
 * @returns {Array} Tableau de nombres et/ou de chaînes de caractères représentant la plage de pagination.
 */
export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    // Si le nombre total de pages est inférieur ou égal au nombre de pages affichées
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Si les points de suspension à gauche ne sont pas nécessaires mais ceux à droite le sont
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, '...', totalPageCount];
    }

    // Si les points de suspension à droite ne sont pas nécessaires mais ceux à gauche le sont
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightRange = range(totalPageCount - (3 + 2 * siblingCount) + 1, totalPageCount);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Si les points de suspension sont nécessaires à gauche et à droite
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
