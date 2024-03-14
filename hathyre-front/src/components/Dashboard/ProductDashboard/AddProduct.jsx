import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const navigate = useNavigate(); // Utilisation du hook useNavigate
  // const [productDate, setProductDate] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    const newProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      promo: productPromo,
      stock: productStock,
    };

    axios
      .post("http://localhost:5000/api/add/product", newProduct)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
        // Réinitialisez les champs après avoir ajouté le produit avec succès
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductPromo("");
        setProductStock("");

        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit :", error);
      });
  };

  return (
    <div>
      <h1>Nouveau Produit</h1>

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
