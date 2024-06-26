import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Argentina.css';
import Arg from './arg.png';
import ArgStars from './arg-stars.png';
import Icon from '../../../icon.png';
import Icon2 from '../../../flecha-abajo.png';
import Icon3 from '../../../cerrar-sesion.png';

const Argentina = ({ albumId, savedStickers, pastedStickers, setPastedStickers}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pastingSticker, setPastingSticker] = useState(false);
    const [pastedStickersAux, setPastedStickersAux] = useState(() => {
        const storedStickers = localStorage.getItem('pastedStickersAux');
        return storedStickers ? JSON.parse(storedStickers) : {};
    });
    const navigate = useNavigate();

    const cards = Array.from({ length: 12 }, (_, index) => index + 85);
    const firstRow = cards.slice(0, 6);
    const secondRow = cards.slice(6);

// Transformar pastedStickers en un objeto donde las claves son los stickerID
const pastedStickersObject = pastedStickers.reduce((acc, sticker) => {
    if (sticker && sticker.stickerID !== undefined) {
        acc[sticker.stickerID] = sticker;
    }
    return acc;
}, {});


const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    const stickerId = card;
    if (!pastingSticker){
        setPastingSticker(true);
        handlePasteSticker(stickerId);
    }
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

    const GetImageByStickerId = async(stickerId) => {
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/GetImageByStickerId?stickerId=${stickerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                return data;
            } else {
                console.error('Error al TRAER IMAGEN DE STICKER:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }


    const handlePasteSticker = async (stickerId) => {
        const card = stickerId;
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/PasteSticker?stickerId=${stickerId}&albumId=${albumId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                // Obtener la imagen del sticker desde el backend
                const imageURL = await GetImageByStickerId(stickerId);
    
                // Actualizar el estado de los stickers pegados y almacenar la imagen
                const updatedStickersAux = { 
                    ...pastedStickersAux, 
                    [stickerId]: { 
                        ...pastedStickersAux[stickerId], 
                        stickerID: stickerId,
                        image: imageURL 
                    }
                };
                setPastedStickersAux(updatedStickersAux);
                //localStorage.setItem('pastedStickersAux', JSON.stringify(updatedStickersAux));
                console.log(updatedStickersAux, "aux");
                // Actualizar el estado de los stickers pegados
                const updatedStickers = [...pastedStickers]; // Convertir a array
                updatedStickers[card] = { 
                    stickerID: stickerId,
                    image: imageURL
                };
                setPastedStickers(updatedStickers);
                console.log(updatedStickers, "no aux-");
            } else {
                console.error('Error al pegar el sticker en el álbum:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        setPastingSticker(false);
    };
    
    

    const isStickerSaved = (card) => {
        return savedStickers && savedStickers.some(sticker => sticker.stickerID === card);
    };

    const isStickerPasted = (card) => {
        return pastedStickersAux && pastedStickersAux[card];
    };


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
                            <button onClick={handleClick} className='links'>Abrir Sobres</button>
                            <button onClick={handleClick2} className='links'>Repetidas</button>
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
            <div className='album-container'>
                <div className='argentina-album'>
                    <div className='title-country-container'>
                        <img src={Arg} alt="Bandera de Argentina" className="arg-flag" />
                        <h1 className="arg-title">ARGENTINA </h1>
                    </div>
                    <img src={ArgStars} alt="Estrellas de Argentina" className="arg-stars"/>
                    <div className="row1">
                        {firstRow.map(card => (
                            <div key={card} className={`card ${isStickerSaved(card) ? 'highlight' : ''} ${pastedStickersAux[card] ? 'pasted' : ''}`} onClick={() => handleCardClick(card)}>                                
                                {!pastedStickersAux[card] && !pastedStickersObject[card] && (
                                    <React.Fragment>
                                        <div className='page-number'>ARG</div>
                                        <div className='page-number'>{card - 85}</div>
                                    </React.Fragment>
                                )}
                                {pastedStickersAux[card] && (
                                    <img
                                        src={(pastedStickersAux[card] || {}).image || ''}
                                        alt="Sticker pegado"
                                        className="pasted-sticker"
                                    />
                                )}
                                {pastedStickersObject[card] && !pastedStickersAux[card] && (
                                    <img
                                        src={(pastedStickersObject[card] || {}).image || ''}
                                        alt="Sticker pegado"
                                        className="pasted-sticker"
                                    />
                                )}
                            </div>
                        ))}
                        <div className='page-album'><b>2</b></div>
                    </div>
                    <div className="row2">
                        {secondRow.map(card => (
                            <div key={card} className={`card ${isStickerSaved(card) ? 'highlight' : ''} ${pastedStickersAux[card] ? 'pasted' : ''}`} onClick={() => handleCardClick(card)}>
                               {!pastedStickersAux[card] && !pastedStickersObject[card] && (
                                    <React.Fragment>
                                        <div className='page-number'>ARG</div>
                                        <div className='page-number'>{card - 85}</div>
                                    </React.Fragment>
                                )}
                                {pastedStickersAux[card] &&(
                                    <img
                                        src={(pastedStickersAux[card] || {}).image || ''}
                                        alt="Sticker pegado"
                                        className="pasted-sticker"
                                    />
                                )}
                                {pastedStickersObject[card]&& !pastedStickersAux[card] && (
                                    <img
                                        src={(pastedStickersObject[card] || {}).image || ''}
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