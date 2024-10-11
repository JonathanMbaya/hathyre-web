import React from 'react';
import {Link} from "react-router-dom";
import ButtonNice from "../Button/ButtonNice";
// import { InstagramEmbed } from 'react-social-media-embed';
import './Instagram.css';

function Instagram() {
  return (
    <div className='area-instagram-all'>

        <h2 style={{color: "#45260D"}}>Notre communauté</h2>

        <div className='area-instagram'>

            <p className='animate__animated animate__slideInLeft'>Nous partageons nos expériences au quotidien avec notre communauté instagram </p>

            <Link className='animate__animated animate__slideInRight' to="https://www.instagram.com/hathyre_/" target="_blank">

                <ButtonNice text="Rejoins nous sur Instagram"/>  

                {/* <img style={{width: "340px"}} src="./instagram.jpg" alt="" /> */}

            </Link>

        </div>

    </div>
  )
}

export default Instagram
