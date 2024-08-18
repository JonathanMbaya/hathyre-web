import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './Dashboard.css';

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productConseils, setProductConseils] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("ingredients", productIngredients);
    formData.append("conseils", productConseils);
    formData.append("promo", productPromo);
    formData.append("stock", productStock);
    formData.append("image", file);

    try {
      const response = await axios.post("https://hathyre-server-api.onrender.com/api/add/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Réponse du serveur :", response.data);

      // Reset fields
      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setProductDescription("");
      setProductIngredients("");
      setProductConseils("");
      setProductPromo("");
      setProductStock("");
      setFile(null);

      const userId = localStorage.getItem('id');
      const userToken = localStorage.getItem('token');
      if (userId && userToken) {
        navigate(`/admin/dashboard/${userId}/${userToken}`);
      } else {
        console.error("ID utilisateur ou jeton d'authentification manquant dans le stockage local.");
        alert("Une erreur s'est produite lors de la navigation. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      alert("Une erreur s'est produite lors de l'ajout du produit. Veuillez réessayer.");
    }
  };

  const returnButton = () => {
    navigate(`/admin/dashboard/${localStorage.getItem('id')}/${localStorage.getItem('token')}`);
  }

  return (
    <div>

        
      <h1 style={{textAlign: 'center'}}>
        <span> <FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /> </span>
        Ajouter un nouveau produit
      </h1>



      <form className="form-edit-product" encType="multipart/form-data">

        

        <div className="other-info">
          <h2>Informations sur le produit</h2>
          <div className="element-input">
            <label htmlFor="productName">Nom</label>
            <input
              type="text"
              id="productName"
              placeholder="Nom du produit"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
            <label htmlFor="productPrice">Prix</label>
            <input
              type="number"
              id="productPrice"
              placeholder="Prix"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <div className="element-input">
            <label htmlFor="productPromo">Promotion</label>
            <input
              type="number"
              id="productPromo"
              placeholder="Promotion"
              value={productPromo}
              onChange={(e) => setProductPromo(e.target.value)}
            />
          </div>

          <div className="element-input">
            <label htmlFor="productStock">Stock</label>
            <input
              type="text"
              id="productStock"
              placeholder="Stock disponible"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            />
          </div>

        </div>

        <div className="other-info">

          <h2>Autres informations</h2>

          <div className="element-input">
            <label htmlFor="productDescription">Description du produit (taille, capacité, ...)</label>
            <textarea
              id="productDescription"
              placeholder="Décrivez les caractéristiques physique du produit qui vont inciter le client à l'achat (taille, capacité, couleur , odeur, etc ...)."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              cols="50"
              rows="10"
            />
          </div>

          <div className="element-input">
            <label htmlFor="productIngredients">Ingrédients</label>
            <textarea
              id="productIngredients"
              placeholder="Préciser les composants de produits ex: (Citron, Huiles, Beurres de Karité, ...)"
              value={productIngredients}
              onChange={(e) => setProductIngredients(e.target.value)}
              cols="50"
              rows="10"
            />
          </div>

          <div className="element-input">

            <label htmlFor="productConseils">Conseils d'utilisation</label>
            <textarea
              id="productConseils"
              placeholder="Donnez plus de conseils sur l'utilisation du produit afin de maximiser les résultats"
              value={productConseils}
              onChange={(e) => setProductConseils(e.target.value)}
              cols="50"
              rows="10"
            />
          </div>

          <div className="element-input">
            <label htmlFor="productImage">Image du produit</label>
            <input type="file" id="productImage" name="image" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
          </div>

        </div>

      </form>

      <div className="submit-edit-product">
        <button
          
          onClick={handleAddProduct}
          type="submit"
          name="Mettre en ligne"
          id=""
        >
          Ajouter

        </button>
      </div>
    </div>
  );
}

export default AddProduct;
