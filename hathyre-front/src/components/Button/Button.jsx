import React from 'react';
import Button from 'react-bootstrap/Button';
import './Button.css';

function Buttons({text}){
    return (
        <div>
            <Button variant="primary" size="lg">
                {text}
            </Button>
        </div>
    );
};

export default Buttons;