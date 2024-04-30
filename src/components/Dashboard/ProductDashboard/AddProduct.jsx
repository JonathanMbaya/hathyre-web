import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Utilisation du hook useNavigate

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
  
    // Vérifiez si un fichier a été sélectionné
    if (!file) {
      alert("Veuillez sélectionner une image.");
      return;
    }
  
    // Créez un objet FormData pour envoyer les données au serveur, y compris l'image
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("promo", productPromo);
    formData.append("stock", productStock);
    formData.append("image", file);
  
    try {
      // Envoyez les données au serveur avec multipart/form-data
      const response = await axios.post("http://localhost:8080/api/add/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Réponse du serveur :", response.data);
  
      // Réinitialisez les champs après avoir ajouté le produit avec succès
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductPromo("");
      setProductStock("");
      setFile(null);
  
      // Vérifiez si les valeurs existent dans le stockage local avant de naviguer
      const userId = localStorage.getItem('id');
      const userToken = localStorage.getItem('token');
      if (userId && userToken) {
        navigate(`/admin/dashboard/${userId}/${userToken}`);
      } else {
        // Gérer le cas où les valeurs ne sont pas définies dans le stockage local
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
      <h1> 
        <FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /> 
        Ajouter un nouveau produit
      </h1>

      <form encType="multipart/form-data">
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
          <label htmlFor="productDescription">Description</label>
          <input
            type="text"
            id="productDescription"
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
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

        <div className="element-input">
          <label htmlFor="productImage">Image du produit</label>
          <input type="file" id="productImage" name="image" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
        </div>

        <button onClick={handleAddProduct}>Ajouter</button>
      </form>
    </div>
  );
}

export default AddProduct;
