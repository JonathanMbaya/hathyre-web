import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { Skeleton } from '@mui/material';
import './banner.css';

// Chargement paresseux de ButtonNice
const ButtonNice = React.lazy(() => import('../Button/ButtonNice.jsx'));

function Banner({ title, item1, src1, src2, src3 }) {
    return (
        <div>
            <div className='container'>
                <h2>{title}</h2>
                <p style={{ width: "88%", textAlign: "center", fontSize: "18px" }}>
                    Explorez la gamme Hathyre et offrez à votre peau une expérience 
                    de soin unique, alliant les bienfaits du beurre de karité à des 
                    ingrédients naturels pour révéler votre beauté authentique.
                </p>
            </div>

            <div className="parent">
                <div className="box1 div1">
                    <h3>{item1}</h3>
                    {/* Utilisation de Skeleton pour le chargement des images */}
                    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                        <img src={src1} alt="Strength" />
                    </Suspense>
                    <div className="button-up">
                        {/* Utilisation de Skeleton pour les boutons */}
                        <Suspense fallback={<Skeleton variant="rectangular" width={150} height={40} />}>
                            <Link to="/product">
                                <ButtonNice text="Savons" />
                            </Link>
                        </Suspense>
                    </div>
                </div>

                <div className="box2 div2">
                    <h3>{item1}</h3>
                    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                        <img src={src2} alt="Strength" />
                    </Suspense>
                    <div className="button-up">
                        <Suspense fallback={<Skeleton variant="rectangular" width={150} height={40} />}>
                            <Link to="/product">
                                <ButtonNice text="Beurres et Huiles" />
                            </Link>
                        </Suspense>
                    </div>
                </div>

                <div className="box2 div3">
                    <h3>{item1}</h3>
                    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                        <img src={src3} alt="Strength" />
                    </Suspense>
                    <div className="button-up">
                        <Suspense fallback={<Skeleton variant="rectangular" width={150} height={40} />}>
                            <Link to="/product">
                                <ButtonNice text="Accessoires" />
                            </Link>
                        </Suspense>
                    </div>
                </div>

                <div className="box3 div4">
                    <h3>{item1}</h3>
                    <div className="button-up">
                        <Suspense fallback={<Skeleton variant="rectangular" width={150} height={40} />}>
                            <Link to="/product">
                                <ButtonNice text="Tous les produits" />
                            </Link>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
