import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Album.css';
import './Italia.css';
import Ita from './ita.png';
import ItaStars from './ita-apodo.png';
import Icon from '../../../icon.png';
import Icon2 from '../../../flecha-abajo.png';
import Icon3 from '../../../cerrar-sesion.png';

const Italia = ({ savedStickers, setSavedStickers, albumId }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const cards = Array.from({ length: 12 }, (_, index) => index + 1);
    const navigate = useNavigate();

    // Dividir el array en dos grupos de 6 elementos cada uno
    const firstRow = cards.slice(0, 6);
    const secondRow = cards.slice(6);

    const handleCardClick = (card) => {
        console.log("Card clicked:", card);
        const stickerId = card; // El stickerId es igual al número de la tarjeta
        handlePasteSticker(stickerId);
    };
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleClick = () => {
      navigate('/abrir-sobres');
    };

    const handleClick2 = () => {
        navigate('/repetidas');
      };


    // Función para pegar un sticker en el álbum cuando se hace clic en una tarjeta
    const handlePasteSticker = async (stickerId) => {
  try {
    const response = await fetch(`https://localhost:7172/api/Stickers/PasteSticker?stickerId=${stickerId}&albumId=${albumId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Actualizar el estado local de stickers guardados
      setSavedStickers(prevSavedStickers => [...prevSavedStickers, { stickerID: stickerId }]);
      console.log('Sticker pegado en el álbum exitosamente.');
    } else {
      console.error('Error al pegar el sticker en el álbum:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
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
                            <button onClick={handleClick} className='links'>Abrir Sobres</button>
                            <button onClick={handleClick2} className='links'>Repetidas</button>
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
            <div className='album-container'>
                <div className='italia-album'>
                    <div className='title-country-container'>
                        <img src={Ita} alt="Bandera de Italia" className="ita-flag" style={{ width: 120, height: 120 }} />
                        <h1 className="ita-title">ITALIA</h1>
                    </div>
                    <img src={ItaStars} alt="Estrellas de Italia" className="ita-stars" style={{ width: 200, height: 80 }} />
                    <div className="row1">
                        {firstRow.map(card => (
                            <div key={card} className='card'>
                                <div className='page-number'>ITA</div>
                                <div className='page-number'>{card}</div>
                                <div className='page-album'>4</div>
                            </div>
                        ))}
                    </div>
                    <div className="row2">
                        {secondRow.map(card => (
                            <div key={card} className='card'>
                                <div className='page-number'>ITA</div>
                                <div className='page-number'>{card}</div>
                                <div className='page-album'>4</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="navigation-arrows">
                <Link to='/brasil'>
                <button className="boton-album boton-izquierdo">&lt;</button>
                </Link>
                <Link to='/alemania'>
                <button className="boton-album boton-derecho"> &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default Italia;
