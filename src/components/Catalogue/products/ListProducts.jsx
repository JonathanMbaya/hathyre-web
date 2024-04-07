import React from "react";
import "./Product.css";

function ListProducts() {
  return (
        <div className="list-products">
            <div className="product">
            <img
                className='img-fluid'
                src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"}
                alt=""
            />
            <p>Nom du produit</p>
            <p>19.99</p>
            </div>

            <div className="product">
            <img
                className='img-fluid'
                src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"}
                alt=""
            />
            <p>Nom du produit</p>
            <p>19.99</p>
            </div>

            <div className="product">
            <img
                className='img-fluid'
                src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"}
                alt=""
            />
            <p>Nom du produit</p>
            <p>19.99</p>
            </div>
        </div>
  );
}

export default ListProducts;
