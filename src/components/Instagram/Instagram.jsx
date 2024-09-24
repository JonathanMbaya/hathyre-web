import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import './Instagram.css';

function Instagram() {
  return (
    <div className='area-instagram-all'>

        <h2>Notre communauté</h2>

        <div className='area-instagram'>

            <p className='animate__animated animate__slideInLeft'>Nous partageons nos expériences au quotidien avec notre communauté instagram </p>

            <div className='photo-instagram animate__animated animate__slideInRight'>                
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C8IAlPxIn_O/?utm_source=ig_web_copy_link" width={328} height={350} />
                </div>
                
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C-VgRLZNmCs/?utm_source=ig_web_copy_link" width={328} height={350} />
                </div>
            </div>



        </div>


      
    </div>
  )
}

export default Instagram
