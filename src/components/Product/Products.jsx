import React, { useRef, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Skeleton, Grid } from '@mui/material';
import { useQuery } from 'react-query'; // Importation de useQuery
import axios from 'axios';
import 'animate.css';
import './products.css';

// Utilisation de React.lazy pour le chargement paresseux des composants
const ButtonToBasket = React.lazy(() => import('../Button/ButtonToBasket'));

// Fonction pour récupérer les produits via Axios
const fetchLatestProducts = async () => {
    const { data } = await axios.get('https://hathyre-server-api.onrender.com/api/products/latest');
    return data;
};

function Products({ title }) {
    const location = useLocation();
    const sliderRef = useRef(null);
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    // Utilisation de React Query pour récupérer les produits
    const { data: products = [], isLoading, isError } = useQuery('latestProducts', fetchLatestProducts, {
        staleTime: 300000, // 5 minutes avant d'invalider le cache
        cacheTime: 600000, // 10 minutes pour garder les données en cache
    });

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            if (direction === 'left') {
                sliderRef.current.scrollLeft -= scrollAmount;
            } else {
                sliderRef.current.scrollLeft += scrollAmount;
            }

            sliderRef.current.classList.add('animate-scroll');
            setTimeout(() => {
                sliderRef.current.classList.remove('animate-scroll');
            }, 300);
        }
    };

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            scroll('right');
        }
        if (touchStart - touchEnd < -50) {
            scroll('left');
        }
    };

    if (isLoading) {
        return (
            <Grid container spacing={2}>
                {[1, 2, 3, 4].map((_, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                        <Skeleton variant="rectangular" width={310} height={218} />
                        <Skeleton variant="text" width={310} />
                        <Skeleton variant="text" width={310} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (isError) {
        return <div>Erreur lors du chargement des produits</div>;
    }

    return (
        <div className="container animate__animated animate__fadeInUp">
            {location.pathname.startsWith('/') && 
            <>
                <h2>{title}</h2>
                <p style={{width:"88%", textAlign:"justify", fontSize:"18px"}}>
                    Explorez nos dernières créations chez Hathyre et offrez à votre peau des soins innovants 
                    et éthiques, qui allient douceur et efficacité _/
                </p>
            </>
            }

            {location.pathname.startsWith('/product/') && 
                <h2>Ces nouveautés pourraient vous intéresser</h2>
            }

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
                            <Link to={`/product/${product._id}`}>
                                <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
                            </Link>
                            <div className="info-home-product">
                                <h3 style={{paddingLeft: ".5rem"}}>{product.name} <br /> <span>Savon</span></h3>
                                <div className="info-home-action-product">
                                    <h4 style={{paddingLeft: ".5rem", paddingTop: ".5rem"}}>{product.price} EUR</h4>

                                    {/* Chargement paresseux du bouton avec fallback Skeleton */}
                                    <Suspense fallback={<Skeleton variant="rectangular" width={100} height={40} />}>
                                        <ButtonToBasket getProductId={product._id} />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
