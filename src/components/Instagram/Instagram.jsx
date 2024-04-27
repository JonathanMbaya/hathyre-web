import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import './Instagram.css';

function Instagram() {
  return (
    <div className='area-instagram-all'>

        <h2>Notre communauté</h2>

        <div className='area-instagram'>

            <p className='animate__animated animate__slideInLeft'>Nous partageons nos expériences aux quotidiens avec notre communauté instagram </p>

            <div className='photo-instagram animate__animated animate__slideInRight'>
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C5B7WZEr84Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} height={350} />
                </div>
                
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C1u0IpArYm8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} height={350} />
                </div>
                
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C1XYv1GriUT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} height={350} />
                </div>
            </div>



        </div>


      
    </div>
  )
}

export default Instagram
