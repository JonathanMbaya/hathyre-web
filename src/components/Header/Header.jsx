import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faVialCircleCheck, faLeaf} from "@fortawesome/free-solid-svg-icons";
import './header.style.css';
import 'animate.css';
import NewNavbar from '../Navbar/newNavbar'; // Assurez-vous que ce composant existe

const images = [
  '/background-home-2.jpg',
  '/background-home.jpg',
  // Ajoutez plus d'images ici
];

const Header = ({ currentPage }) => {
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel dynamique pour changer d'image toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle
  }, []);

//   const nextImage = () => {
//     setCurrentImageIndex((currentImageIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (currentImageIndex - 1 + images.length) % images.length
//     );
//   };

  return (
    <div className='header'>
      {location.pathname === '/' && (
        <div className='header-home'>
          <NewNavbar />
          <div className='banner-home'>
            <div className='text-banner-home'>

                <h2
                    className='animate__animated animate__fadeInDown'
                    style={{ textAlign: 'left', fontSize: "30px", paddingLeft:".5rem" }}
                >
                    Hathyre,<br />
                    votre secret de beauté au quotidien.
                </h2>

                <p className='fakebutton'>100% Bio <FontAwesomeIcon icon={faLeaf} /></p>
                <p className='fakebutton'>A base de Beurre de Karité <FontAwesomeIcon icon={faCircleCheck} /></p>
                <p className='fakebutton'>Certifié par un laboratoire <FontAwesomeIcon icon={faVialCircleCheck} /></p>
            

            </div>
            <div className='carousel-container'>
                <div className='carousel-image'>
                    <img
                    src={process.env.PUBLIC_URL + images[currentImageIndex]}
                    alt='Carousel Product'
                    className='slider-image'
                    style={{borderRadius: "1rem 0rem 0rem 1rem"}}
                    />
                </div>

                {/* Boutons de contrôle du carousel */}
                {/* <button className='carousel-control prev' onClick={prevImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className='carousel-control next' onClick={nextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Sections spécifiques à certaines routes */}
      {location.pathname === '/product' && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname === '/apropos' && (
        <div className='header-home'>
          <NewNavbar />
          <video autoPlay loop muted style={{ width: '100%', height: 'auto' }}>
            <source
              src={`${process.env.PUBLIC_URL}/karité.mp4`}
              type='video/mp4'
            />
            {/* Ajoutez d'autres formats de vidéo si nécessaire */}
          </video>
        </div>
      )}

      {location.pathname === '/account' && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname.startsWith('/product/') && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname.startsWith('/checkout') && (
        <div className='header-home'>
          <div>
            <img src={process.env.PUBLIC_URL + '/hathyre-logo.png'} alt='' />
          </div>
        </div>
      )}

      {location.pathname.startsWith('/faq') && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname.startsWith('/mentions-legales') && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname.startsWith('/politique-de-confidentialite') && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}

      {location.pathname.startsWith('/conditions-ventes') && (
        <div className='header-home'>
          <NewNavbar />
        </div>
      )}
    </div>
  );
};

export default Header;
