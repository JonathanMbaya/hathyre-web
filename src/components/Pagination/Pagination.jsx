import React from 'react';
import { usePagination } from '../../utils/usePagination.js';

/**
 * Composant Pagination pour gérer l'affichage et la navigation des pages.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.currentPage - La page actuelle.
 * @param {number} props.totalCount - Le nombre total d'éléments.
 * @param {number} props.pageSize - Le nombre d'éléments par page.
 * @param {Function} props.onPageChange - La fonction à appeler lors du changement de page.
 * @returns {JSX.Element|null} Élément JSX du composant Pagination ou null si la pagination n'est pas nécessaire.
 */
const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const paginationRange = usePagination({ currentPage, totalCount, pageSize });

  // Si la page actuelle est 0 ou si la plage de pagination contient moins de 2 éléments, ne pas afficher la pagination.
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  /**
   * Fonction pour gérer le clic sur un numéro de page.
   * @param {number} page - Le numéro de la page sur laquelle l'utilisateur a cliqué.
   */
  const onPageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {/* Bouton pour aller à la page précédente */}
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageClick(currentPage - 1)}
      >
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </li>
      {/* Affichage des numéros de page */}
      {paginationRange.map((pageNumber, index) => {
        // Si le numéro de page est '...', afficher des points de suspension.
        if (pageNumber === '...') {
          return <li key={index} className="dots">...</li>;
        }
        return (
          <li
            key={index}
            className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageClick(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Bouton pour aller à la page suivante */}
      <li
        className={`page-item ${currentPage === Math.ceil(totalCount / pageSize) ? 'disabled' : ''}`}
        onClick={() => onPageClick(currentPage + 1)}
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </li>
    </div>
  );
};

export default Pagination;
