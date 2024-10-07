import React, { Suspense } from 'react';
import { Skeleton } from "@mui/material";

// Utilisation de React.lazy pour charger les composants de manière paresseuse
const Banner = React.lazy(() => import('../../components/Banner/Banner'));
const Products = React.lazy(() => import('../../components/Product/Products'));
const Footer = React.lazy(() => import('../../components/Footer/Footer'));
const Certif = React.lazy(() => import('../../components/Certif/Certif'));
const Instagram = React.lazy(() => import('../../components/Instagram/Instagram'));

function HomePage({ currentPage }) {
    return (
        <>
            <Suspense fallback={<Skeleton variant="rectangular" width={210} height={218} />}>
                <Products title="Découvrez nos nouveautés" />
            </Suspense>

            <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={300} />}>
                <Banner
                    title="Toute la gamme de Hathyre"
                    src1={process.env.PUBLIC_URL + "/bannerhome/5.avif"}
                    src2={process.env.PUBLIC_URL + "/bannerhome/huile.webp"}
                    src3={process.env.PUBLIC_URL + "/bannerhome/accessoire.avif"}
                />
            </Suspense>

            <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                <Instagram />
            </Suspense>

            <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                <Certif />
            </Suspense>

            <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={100} />}>
                <Footer />
            </Suspense>
        </>
    );
}

export default HomePage;
