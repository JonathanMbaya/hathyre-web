import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.style.css';


function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="link-without-decoration">Home</Link>
                    </li>
                    <li>
                        <Link to="/product" className="link-without-decoration">Catalogue</Link>
                    </li>
                    <li>
                        <Link to="/apropos" className="link-without-decoration">A propos de Hathyre</Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    );
};

export default Navbar;