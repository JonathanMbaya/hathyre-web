import React, { useRef, Suspense, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Skeleton, Grid } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import './products.css';

const ButtonToBasket = React.lazy(() => import('../Button/ButtonToBasket'));

// Fonction pour récupérer les produits via Axios
const fetchLatestProducts = async () => {
    const { data } = await axios.get('https://hathyre-server-api.onrender.com/api/products/latest');
    return data;
};

// Composant Skeleton pour afficher des placeholders pendant le chargement
const ProductSkeleton = () => (
    <div>
        <Grid item xs={4} sm={4}>
            <Skeleton variant="rectangular" width={310} height={218} />
            <Skeleton variant="text" width={210} />
            <Skeleton variant="text" width={110} />
        </Grid>
    </div>
);

function Products({ title }) {
    const location = useLocation();
    const sliderRef = useRef(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    // Utilisation de React Query pour récupérer les produits
    const { data: products = [], isLoading, isError } = useQuery('latestProducts', fetchLatestProducts, {
        staleTime: 300000, // 5 minutes avant d'invalider le cache
        cacheTime: 600000, // 10 minutes pour garder les données en cache
    });

    // Fonction pour le défilement du slider
    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            sliderRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;

            sliderRef.current.classList.add('animate-scroll');
            setTimeout(() => {
                sliderRef.current.classList.remove('animate-scroll');
            }, 300);
        }
    };

    // Gestion des événements tactiles
    const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (touchStart - touchEnd > 50) scroll('right');
        if (touchStart - touchEnd < -50) scroll('left');
    };

    // Gestion des erreurs lors du chargement des produits
    if (isError) {
        return <div>Erreur lors du chargement des produits</div>;
    }

    // Affichage lors du chargement des produits
    if (isLoading) {
        return (
            <div className="container animate__animated animate__fadeInUp">
                {location.pathname === '/' && (
                    <>
                        <h2>{title}</h2>
                        <p style={{ width: "88%", textAlign: "justify", fontSize: "18px" }}>
                            Explorez nos dernières créations chez Hathyre et offrez à votre peau des soins innovants 
                            et éthiques, qui allient douceur et efficacité.
                        </p>
                    </>
                )}

                {location.pathname.startsWith('/product/') && <h2>Ces nouveautés pourraient vous intéresser</h2>}

                <div className="slider-controls">
                    <button className="scroll-button left" onClick={() => scroll('left')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="scroll-button right" onClick={() => scroll('right')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <div className="slider-container" ref={sliderRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                    <div className="slider-row">
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Gestion du survol de la souris pour changer l'image
    const handleMouseEnter = (productId) => setHoveredProduct(productId);
    const handleMouseLeave = () => setHoveredProduct(null);

    // Rendu final du composant
    return (
        <div className="container animate__animated animate__fadeInUp">
            {location.pathname === '/' && (
                <>
                    <h2>{title}</h2>
                    <p style={{ width: "88%", textAlign: "center", fontSize: "18px" }}>
                        Explorez nos dernières créations chez Hathyre et offrez à votre peau des soins innovants 
                        et éthiques, qui allient douceur et efficacité.
                    </p>
                </>
            )}

            {location.pathname.startsWith('/product/') && <h2>Ces nouveautés pourraient vous intéresser</h2>}

            <div className="slider-controls">
                <button className="scroll-button left" onClick={() => scroll('left')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="scroll-button right" onClick={() => scroll('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
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
                    {products.map((product) => (
                        <div
                            key={product._id}
                            style={{ backgroundColor: "white" }}
                            className="box"
                            onMouseEnter={() => handleMouseEnter(product._id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Grid item xs={4} sm={4}>
                                <span>Nouveauté</span>
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={hoveredProduct === product._id ? product.image2 : product.image}
                                        alt={product.name}
                                    />
                                </Link>
                                <div className="info-home-product">
                                    <h3 style={{ paddingLeft: ".5rem" }}>{product.name} <br /> <span>Savon</span></h3>
                                    <div className="info-home-action-product">
                                        <h4 style={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>{product.price} EUR</h4>
                                        <Suspense fallback={<Skeleton variant="rectangular" width={100} height={40} />}>
                                            <ButtonToBasket getProductId={product._id} />
                                        </Suspense>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
