import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping , faPlus} from '@fortawesome/free-solid-svg-icons';
import './Button.css';
import { CartContext } from '../../context/card.context'; // Importez le contexte du panier

function ButtonToBasket({getProductId}){
    const { addToCart } = useContext(CartContext); // Fonction pour ajouter un produit au panier

    // Fonction de gestionnaire d'événements pour le clic sur le bouton
    const handleAddToCart = () => {
        // Récupérer l'ID du produit à partir de la logique de votre application
        const productId = getProductId; // Remplacez par l'ID du produit que vous souhaitez ajouter au panier
        addToCart(productId); // Appel de la fonction addToCart avec l'ID du produit
    };

    return (
        <>
            {/* Associez la fonction de gestionnaire d'événements au clic sur le bouton */}
            <Button id={getProductId} onClick={handleAddToCart} className='btn-to-basket' variant="primary" size="lg">
                <FontAwesomeIcon  icon={faBagShopping} /> <FontAwesomeIcon  icon={faPlus} /> 
            </Button>
        </>
    );
};

export default ButtonToBasket;
