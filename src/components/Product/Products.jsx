import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonToBasket from '../Button/ButtonToBasket';
import axios from 'axios';
import './products.css';
import 'animate.css';

function Products({ title }) {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const sliderRef = useRef(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits triés par date
        axios.get('https://hathyre-server-api.onrender.com/api/products/latest')
            .then(response => {
                // Mettre à jour l'état avec les produits récupérés
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits :', error);
            });
    
    }, []);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            if (direction === 'left') {
                sliderRef.current.scrollLeft -= scrollAmount;
            } else {
                sliderRef.current.scrollLeft += scrollAmount;
            }

            // Ajoute l'animation au scroll
            sliderRef.current.classList.add('animate-scroll');
            setTimeout(() => {
                sliderRef.current.classList.remove('animate-scroll');
            }, 300); // Durée de l'animation en ms, ici 0.3s comme dans la transition CSS
        }
    };

    // Gestion du début du mouvement
    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    // Gestion de la fin du mouvement
    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            scroll('right'); // Défilement vers la droite
        }
        if (touchStart - touchEnd < -50) {
            scroll('left'); // Défilement vers la gauche
        }
    };

    

    return (
        <div className="container animate__animated animate__fadeInUp">
            {location.pathname.startsWith('/') && 
                <h2>{title}</h2>
            }
            {location.pathname.startsWith('/product/') && 
                <h2>Ces nouveautés pourraient vous intéresser</h2>
            }

            {/* Boutons de navigation */}
            <div className="slider-controls">
                <button className="scroll-button left" onClick={() => scroll('left')}>←</button>
                <button className="scroll-button right" onClick={() => scroll('right')}>→</button>
            </div>

            <div
                style={{ backgroundImage: "url(./bg-review.jpg)" }}
                className="slider-container"
                ref={sliderRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="slider-row">
                    {products.map(product => (
                        <div key={product._id} style={{ backgroundColor: "white" }} className="box">
                            <span>Nouveauté</span>
                            <Link className="link-without-decoration" to={`/product/${product._id}`}>
                                <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
                            </Link>
                            <div className="info-home-product">
                                <h3>{product.name} <br /> <span>Savon</span></h3>
                                <div className="info-home-action-product">
                                    <h4>{product.price} EUR</h4>
                                    <ButtonToBasket getProductId={product._id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;



// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import ButtonToBasket from '../Button/ButtonToBasket';
// import axios from 'axios';
// import './products.css';
// import 'animate.css';

// function Products({ title }) {
//     const [products, setProducts] = useState([]);
//     const location = useLocation();
//     const sliderRef = useRef(null);

//     useEffect(() => {
//         // Effectuer la requête Axios pour récupérer les produits triés par date
//         axios.get('https://hathyre-server-api.onrender.com/api/products/latest')
//             .then(response => {
//                 // Mettre à jour l'état avec les produits récupérés
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des produits :', error);
//             });
    
//     }, []);

//     // Fonction pour faire défiler vers la gauche ou la droite
//     const scroll = (direction) => {
//         if (sliderRef.current) {
//             const scrollAmount = sliderRef.current.offsetWidth;
//             if (direction === 'left') {
//                 sliderRef.current.scrollLeft -= scrollAmount;
//             } else {
//                 sliderRef.current.scrollLeft += scrollAmount;
//             }
//         }
//     };

//     return (
//         <div className="container animate__animated animate__fadeInUp">
//             {location.pathname.startsWith('/') && 
//                 <h2>{title}</h2>
//             }
//             {location.pathname.startsWith('/product/') && 
//                 <h2>Ces nouveautés pourraient vous intéresser</h2>
//             }

//             {/* Boutons de navigation */}
//             <div className="slider-controls">
//                 <button className="scroll-button left" onClick={() => scroll('left')}>←</button>
//                 <button className="scroll-button right" onClick={() => scroll('right')}>→</button>
//             </div>

//             {/* Slider pour les produits */}
//             <div className="slider-container" ref={sliderRef}>
//                 <div className="slider-row">
//                     {products.map(product => (
//                         <div key={product._id} className="slider-box">
//                             <span>Nouveauté</span>
//                             <Link className='link-without-decoration' to={`/product/${product._id}`}>
//                                 <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
//                             </Link>

//                             <div className='info-home-product'>
//                                 <h3>{product.name} <br /> <span>Savon</span></h3>
//                                 <div className='info-home-action-product'>
//                                     <h4>{product.price} EUR</h4>
//                                     <ButtonToBasket getProductId={product._id} />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;

