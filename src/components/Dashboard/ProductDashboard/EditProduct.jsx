import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './Dashboard.css'

function EditProduct() {
  const { id } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productConseils, setProductConseils] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    // Effectuer une requête pour récupérer les détails du produit à modifier
    axios.get(`https://hathyre-server-api.onrender.com/api/product/${id}`)
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
      conseils: productConseils,
      ingredients: productIngredients,
      category: productCategory,
      promo: productPromo,
      stock: productStock,
    };

    // Envoyer une requête pour mettre à jour les détails du produit
    axios.put(`https://hathyre-server-api.onrender.com/api/update/product/${id}`, updatedProduct)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
        // Rediriger vers la page de tableau de bord après la modification réussie
        navigate(`/admin/dashboard/${localStorage.getItem('id')}/${localStorage.getItem('token')}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du produit :", error);
      });
  };
  
  const returnButton = () => {
    navigate(`/admin/dashboard/${localStorage.getItem('id')}/${localStorage.getItem('token')}`);
  }

  return (
    <>

        <div>

          <h1 style={{textAlign: 'center'}}>
            <span> <FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /> </span>
            Modifier Produit | {productName}
          </h1>

          <form className="form-edit-product">
            <div className="other-info">
              <h2>Informations sur le produit</h2>

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
                <label htmlFor="">Categorie du produit</label>
                <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                  <option value="">Sélectionner la catégorie</option>
                  <option value="Savon">Savon</option>
                  <option value="Savon">Beurres et huiles</option>
                  <option value="Savon">Accessoires</option>

                </select>
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

            </div>

            <div className="other-info">
              <h2>Autres informations</h2>

              <div className="element-input">
                <label htmlFor="">Description du produit</label>
                <textarea
                  placeholder="Décrivez les caractéristiques physique du produit qui vont inciter le client à l'achat (taille, capacité, couleur , odeur, etc ...)."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  cols="50"
                  rows="10"
                />
              </div>

              <div className="element-input">
                <label htmlFor="">Ingrédients</label>
                <textarea
                  placeholder="Précisez les composants de produits ex: (Citron, Huiles, Beurres de Karité, ...)"
                  value={productIngredients}
                  onChange={(e) => setProductIngredients(e.target.value)}
                  cols="50"
                  rows="10"
                />
              </div>

              <div className="element-input">
                  <label htmlFor="">Conseils d'utilisation</label>
                  <textarea
                    placeholder="Donnez plus de conseils sur l'utilisation du produit afin de maximiser les résultats"
                    value={productConseils}
                    onChange={(e) => setProductConseils(e.target.value)}
                    cols="50"
                    rows="10"
                  />
              </div>



            </div>

          </form>

          <div className="submit-edit-product">
            <button
              
              onClick={handleEditProduct}
              type="submit"
              name="Mettre en ligne"
              id=""
            >
              Mettre à jour

            </button>
          </div>


        </div>
      
    </>
  )
}

export default EditProduct
