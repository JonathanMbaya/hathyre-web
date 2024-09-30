import React from 'react';
import {Link} from "react-router-dom";
// import { InstagramEmbed } from 'react-social-media-embed';
import './Instagram.css';

function Instagram() {
  return (
    <div className='area-instagram-all'>

        <h2 style={{color: "#45260D"}}>Notre communauté</h2>

        <div className='area-instagram'>

            <p className='animate__animated animate__slideInLeft'>Nous partageons nos expériences au quotidien avec notre communauté instagram </p>

            <div className='photo-instagram animate__animated animate__slideInRight'>                
                {/* <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C8IAlPxIn_O/?utm_source=ig_web_copy_link" width={328} height={350} />
                </div>
                
                <div className='icon-instagram' style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url="https://www.instagram.com/p/C-VgRLZNmCs/?utm_source=ig_web_copy_link" width={328} height={350} />
                </div> */}

                <Link to="https://www.instagram.com/hathyre_/" target="_blank">

                    <img style={{width: "340px"}} src="./instagram.jpg" alt="" />

                
                </Link>

            </div>



        </div>


      
    </div>
  )
}

export default Instagram
