import React, {useContext, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from '../../pages/admin/Connexion/Login';
import {LoginContext} from "../../context/login.context";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../pages/admin/Connexion/AdminLogin';


function PopLogin({open, handleClose}) {
  const { userConnected } = useContext(LoginContext);

  // Utilisation d'un useEffect pour fermer la pop-up si l'utilisateur est connecté
  useEffect(() => {
    if (userConnected && handleClose) {
      handleClose();
    }
  }, [userConnected, handleClose]);

  return (
    <>
      {open && (
        <div className="login-popup">
            <div className="popup-content-login">
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleClose}
                    className="close-icon"
                />
                <Login/>
                
            </div>
        </div>
      )}
    </>
  );
}

export default PopLogin;
