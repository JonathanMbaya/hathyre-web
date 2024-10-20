import React from 'react';
import {Link} from 'react-router-dom';
import ButtonNice from "../Button/ButtonNice";
import './InfoAbout.css';

function InfoAbout () {
    return (
        <>
            
            <div id='block' className='block-tri-info'>
                <div className='tri-info'>
                    <h2>Notre mission</h2>
                    <p>
                        La mission de <strong>Hathyre</strong> est de créer des produits qui subliment la <strong>peau</strong>, 
                        tout en restant respectueux de l'<strong>environnement</strong>. Nous offrons des solutions saines et efficaces, 
                        que vous ayez besoin d’une <strong>crème hydratante</strong>, d’un baume ou d’un soin régénérant. 
                        Avec <strong>Hathyre</strong>, prenez soin de votre peau naturellement.
                    </p>
                </div>

                <div className='tri-info'>
                        <h2>Secret de fabrication</h2>
                        <p>
                            Chaque produit <strong>Hathyre</strong> est conçu avec des <strong>ingrédients naturels</strong>, sélectionnés 
                            avec soin pour garantir leur qualité. Notre processus artisanal et respectueux de l'<strong>environnement, </strong> 
                            nous permet de créer des soins doux pour la peau, tout en préservant les richesses naturelles.
                        </p>
                </div>


                <div className='tri-info'>
                    <h2>
                        Pourquoi choisir les produits Hathyre ?
                    </h2>

                    <p>
                        Choisir <strong>Hathyre</strong>, c’est opter pour des <strong>soins naturels</strong>, sans produits chimiques 
                        agressifs, adaptés à tous types de peau. En plus de nourrir et protéger, nos produits soutiennent 
                        les <strong>pratiques durables</strong> et le <strong>commerce équitable</strong>. Avec Hathyre, 
                        vous respectez la planète tout en prenant soin de votre <strong>peau</strong>.
                    </p>
                </div>
            </div>

            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <Link  to="/faq">
                    <ButtonNice text="Consulter notre FAQ ?"/>
                </Link>
            </div>




        </>
    );
};

export default InfoAbout;
