import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    "_Important : Pour la remise en main propre, c'est tous les vendredis à la gare de Massy TGV_",
    "_Passez vos commandes avant Jeudi 23H pour récupérer votre commande le Vendredi._"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change the message every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages.length]);

  return (
    <div>
      <p style={{ textAlign: "center", backgroundColor: "yellow", margin: "0rem", padding: '.5rem', fontWeight: 'bolder', fontSize: '12px' }}>
        <span>
        <FontAwesomeIcon style={{color: 'red'}} icon={faTriangleExclamation} />
        </span>
        {messages[currentIndex]}
        <span>
        <FontAwesomeIcon style={{color: 'red'}} icon={faTriangleExclamation} />
        </span>
      </p>
    </div>
  );
};

export default Carousel;
