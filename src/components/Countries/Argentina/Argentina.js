import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Argentina.css';
import Arg from './arg.png';
import ArgStars from './arg-stars.png';
import Icon from '../../../icon.png';
import Icon2 from '../../../flecha-abajo.png';
import Icon3 from '../../../cerrar-sesion.png';

const Argentina = ({ albumId, savedStickers  }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pastedStickerId, setPastedStickerId] = useState({});
    const [pastedStickers, setPastedStickers] = useState({});
    const navigate = useNavigate();

    console.log('SAVEADO PA', savedStickers)

    const cards = Array.from({ length: 12 }, (_, index) => index + 1);
    const firstRow = cards.slice(0, 6);
    const secondRow = cards.slice(6);

    const handleCardClick = (card) => {
        console.log("Card clicked:", card);
        const stickerId = card;
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

    const handlePasteSticker = async (stickerId) => {
        const card = stickerId;
        try {
            const response = await fetch(`https://localhost:7172/api/Stickers/PasteSticker?stickerId=${stickerId}&albumId=${albumId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Sticker pegado en el álbum exitosamente.');
                setPastedStickers({ ...pastedStickers, [stickerId]: true });
            } else {
                console.error('Error al pegar el sticker en el álbum:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };


    const getPastedStickers = async () => {
        try {
            const response = await fetch(`https://localhost:7172/api/Stickers/GetPastedStickers?albumId=${albumId}`);
            if (response.ok) {
                const pastedStickersData = await response.json();
                setPastedStickers(pastedStickersData);
            } else {
                console.error('Error al obtener los stickers pegados:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const isStickerSaved = (card) => {
        console.log("confirmamos los saveados")
        return savedStickers && savedStickers.some(sticker => sticker.stickerID === card);
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
                <div className='argentina-album'>
                    <div className='title-country-container'>
                        <img src={Arg} alt="Bandera de Argentina" className="arg-flag" style={{ width: 120, height: 120 }} />
                        <h1 className="arg-title">ARGENTINA </h1>
                    </div>
                    <img src={ArgStars} alt="Estrellas de Argentina" className="arg-stars" style={{ width: 180, height: 180 }} />
                    <div className="row1">
                        {firstRow.map(card => (
                            <div key={card} className={`card ${isStickerSaved(card) ? 'highlight' : ''}`} onClick={() => handleCardClick(card)}>
                                <div className='page-number'>ARG</div>
                                <div className='page-number'>{card}</div>
                                <div className='page-album'>2</div>
                                {pastedStickers[card]  && savedStickers  && (
                                    <img
                                        src={savedStickers.find(sticker => sticker.stickerID === card).image}
                                        alt="Sticker pegado"
                                        className="pasted-sticker"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="row2">
                        {secondRow.map(card => (
                            <div key={card} className={`card ${isStickerSaved(card) ? 'highlight' : ''}`} onClick={() => handleCardClick(card)}>
                                <div className='page-number'>ARG</div>
                                <div className='page-number'>{card}</div>
                                <div className='page-album'>2</div>
                                {pastedStickers[card]  && savedStickers  && (
                                    <img
                                        src={savedStickers.find(sticker => sticker.stickerID === card).image}
                                        alt="Sticker pegado"
                                        className="pasted-sticker"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="navigation-arrows">
                <Link to='/my-album'>
                    <button className="boton-album boton-izquierdo">&lt;</button>
                </Link>
                <Link to='/brasil'>
                    <button className="boton-album boton-derecho"> &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default Argentina;
