import React, {useState} from 'react';
import './Home.css';
import Image2 from '../copa.jpg';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';

const Home = ({albumId}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='full-screen'>
            <div className="home-container">
                <nav className="navbar-content">
                    <div className="left-section">
                        <Link to="/loggeado" className='sticka-link'>
                            <h1 className='sticka'>StickA</h1>
                        </Link>
                    </div>
                    <div className='icon-container'>
                        <div className="right-section">
                                <div className="profile-icon-container"  onClick={toggleMenu}>
                                <img className="icon-login" src={Icon} alt="Imagen logo" />
                                    Perfil
                                <img className="flecha-abajo" src={Icon2} alt="Imagen logo" />
                                </div>
                                {menuOpen && (
                                    <div className="dropdown-menu">
                                        <a href="/"><img className="icon-logout" src={Icon3} alt="Imagen logout" /></a>
                                        <a href="/">Cerrar sesión</a>
                                    </div>
                                )}                               
                        </div>
                    </div>
                </nav>  
            </div>
            <div className='modal-back-container'>
                <div className='left-content-home'>
                    <div className="modal-content">
                        <img className="modal-image" src={Image2} alt="Imagen 1" />
                    </div>
                </div>
            </div>
            <div className='info-section'>
                <h1>Comenzá a jugar!</h1>
                <p>Empezá a abrir sobres, pegá los stickers en tu álbum y completalo para ganar diferentes premios. </p>
                <p>Buena suerte!</p>
                <Link to='/my-album'>
                    <button className='boton-home'>Ir al álbum</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
