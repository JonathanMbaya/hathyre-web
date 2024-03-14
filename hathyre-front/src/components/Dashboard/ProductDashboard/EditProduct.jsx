import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

function EditProduct() {
  const { id } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");

  useEffect(() => {
    // Effectuer une requête pour récupérer les détails du produit à modifier
    axios.get(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        const product = response.data;
        // Mettre à jour les états avec les détails du produit récupéré
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductPromo(product.promo);
        setProductStock(product.stock);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du produit :", error);
      });
  }, [id]); // Utiliser l'ID comme dépendance pour recharger les détails du produit lorsque l'ID change

  const handleEditProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      promo: productPromo,
      stock: productStock,
    };

    // Envoyer une requête pour mettre à jour les détails du produit
    axios.put(`http://localhost:5000/api/update/product/${id}`, updatedProduct)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
        // Rediriger vers la page de tableau de bord après la modification réussie
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du produit :", error);
      });
  };
  
  const returnButton = () => {
    navigate('/dashboard');
  }

  return (
    <div>

        <div>
            <h1> 
                <a href="admin/dashboard"><FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /></a> 
                Modifier Produit | {productName}
            </h1>

            <form>
                <div className="element-input">
                <label htmlFor="">Nom</label>

                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                </div>

                <div className="element-input">
                <label htmlFor="">Prix</label>
                <input
                    type="number"
                    placeholder="Prix"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                </div>

                <div className="element-input">
                <label htmlFor="">Description</label>
                <input
                    type="text"
                    placeholder="description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
                </div>

                <div className="element-input">
                <label htmlFor="">Promotion</label>
                <input
                    type="number"
                    placeholder="promo"
                    value={productPromo}
                    onChange={(e) => setProductPromo(e.target.value)}
                />
                </div>

                <div className="element-input">
                <label htmlFor="">Stock</label>
                <input
                    type="text"
                    placeholder="Stock disponible"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                />
                </div>

                {/* <div className="element-input">
                        <label htmlFor="">Date mis à jour </label>
                        <input
                            type="date"
                            placeholder="promo"
                            value={productDate}
                            onChange={(e) => setProductDate(e.target.value)}
                        />
                    </div> */}

                <input
                onClick={handleEditProduct}
                type="submit"
                name="Mettre en ligne"
                id=""
                />

            </form>

        </div>
      
    </div>
  )
}

export default EditProduct
