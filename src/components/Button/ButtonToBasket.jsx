import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import './Button.css';

function ButtonToBasket(){
    return (
        <div>
            <Button className='btn-' variant="primary" size="lg">
                <FontAwesomeIcon  icon={faBagShopping} />  +
            </Button>
        </div>
    );
};

export default ButtonToBasket;