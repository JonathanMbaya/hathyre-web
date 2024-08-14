import { Link } from 'react-router-dom';
import './Popup.css';



function PopUpLogin() {


    return (
        <div className="popup-login">

            <p>
                Connectez-vous pour bénéficier d'avantages sur vos commandes
            </p>

            <div className='btn-pop-up'>
                <Link to="/login">
                    <button>Se connecter</button>
                </Link>
                <Link to="/checkout">
                    <button>Poursuivre mes achats</button>
                </Link>

            </div>

        </div>
    );
}

export default PopUpLogin;