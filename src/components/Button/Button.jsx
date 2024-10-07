import React from 'react';
import Button from 'react-bootstrap/Button';
import './Button.css';

function Button({text}){
    return (
        <div>
            <Button role="button" aria-labelledby={text} variant="primary" size="lg">
                {text}
            </Button>
        </div>
    );
};

export default Button;