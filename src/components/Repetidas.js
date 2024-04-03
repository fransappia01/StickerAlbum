import React, { useState } from 'react';
import './Repetidas.css';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png'
import Icon3 from '../cerrar-sesion.png'

const Repetidas = ({albumId}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick = () => {
        navigate('/my-album');
    };
  
    const handleClick2 = () => {
      navigate('/abrir-sobres');
    };

    return (
        <div className='full-screen'>
            <div className="home-container">
                <nav className="navbar-content">
                    <div className="left-section">
                    <a className= 'sticka-link' href= '/loggeado'><h1 className='sticka'>StickA</h1></a>
                    </div>
                    <div className='icon-container'>
                        <div className="right-section">
                        <button onClick={handleClick} className='links'>Ver Álbum</button>
                            <button onClick={handleClick2} className='links'>Abrir Sobres</button>
                                <div className="profile-icon-container"  onClick={toggleMenu}>
                                <img className="icon-login" src={Icon} alt="Imagen logo" />
                                    Perfil
                                <img className="flecha-abajo" src={Icon2} alt="Imagen logo" />
                                </div>
                                {menuOpen && (
                                    <div className="dropdown-menu">
                                         <img className="icon-logout" src={Icon3} alt="Imagen logout" />
                                         <a href="/">Cerrar sesión</a>
                                    </div>
                                )}
                                
                        </div>

                    </div>
                </nav>
            </div>
            <div className="repes-container">
                <div className='repes-content'>
                    No tienes figuritas repetidas
                </div>
            </div>
        </div>
    );
};

export default Repetidas;
