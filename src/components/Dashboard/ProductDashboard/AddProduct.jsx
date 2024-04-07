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
      const response = await axios.post("http://localhost:5000/api/add/product", formData, {
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

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  const returnButton = () => {
    navigate('/admin/dashboard');
  }

  return (
    <div>
      <h1> 
        <a href="/admin/dashboard"><FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /></a> 
        Ajouter un nouveau produit
      </h1>

      <form encType="multipart/form-data">
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

        <div className="element-input">
          <label htmlFor="">Image du produit</label>
          <input type="file" name="image" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
        </div>

        <input
          onClick={handleAddProduct}
          type="submit"
          name="Mettre en ligne"
          id=""
        />
      </form>
    </div>
  );
}

export default AddProduct;
