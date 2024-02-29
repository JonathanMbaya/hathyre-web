import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from '../Button/Button';
import './ImageOverlay.css'; // Assure-toi d'avoir un fichier CSS correspondant

const ImageOverlay = ({ imageSrc, text, name }) => {
  return (
    <Container>
        <Row className='catalogue'> 
            <Col>
                <div className='image-overlay'>
                    
                    <div className="overlay"></div>
                    <img src={imageSrc} alt="Background" className="background-image" />
                    <div className='name'>{name}</div>


                    <div className="text">
                        {text}
                        <Button/>
                    </div>

                </div>

            </Col>
        </Row>
    </Container>
  );
};

export default ImageOverlay;
