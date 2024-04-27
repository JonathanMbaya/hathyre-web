import React from 'react';
import './Certif.css';

function Certif() {
  return (
    <div className='area-certif-all'>

        <h2>Nos Certifications</h2>

        <div className='area-certif'>

            <div className='icon-certif'>
                <h4>Bio</h4>
                <img src={process.env.PUBLIC_URL + '/certif/certif.png'} alt="Logo Hathyre" /> 
            </div>
            |
            <div className='icon-certif'>
                <h4>Propreté</h4>
                <img src={process.env.PUBLIC_URL + '/certif/certif.png'} alt="Logo Hathyre" />
            </div>
            |
            <div className='icon-certif'>
                <h4>Médico-Cosmétique</h4>
                <img src={process.env.PUBLIC_URL + '/certif/certif.png'} alt="Logo Hathyre" />
            </div>

        </div>


      
    </div>
  )
}

export default Certif
