import React, { useState, useEffect } from 'react';
import './Repetidas.css';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';

const Repetidas = ({ albumId }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [repeatedStickers, setRepeatedStickers] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);
    const navigate = useNavigate();

    //Para calcular numero de paginas
    const currentPage = Math.floor(startIndex / 4) + 1;
    const totalPages = Math.ceil(repeatedStickers.length / 4);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick = () => {
        navigate('/my-album');
    };

    const handleClick2 = () => {
        navigate('/abrir-sobres');
    };
    

    useEffect(() => {
        const fetchRepeatedStickers = async () => {
            try {
                const response = await fetch(`http://www.stickeralbum.somee.com/api/Stickers/GetRepeatedStickers?albumId=${albumId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRepeatedStickers(data);
                } else {
                    console.error('Error fetching repeated stickers:', response.statusText);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchRepeatedStickers();
    }, [albumId]);

    
    // Las funciones manejan que se vean hasta 4 imagenes
    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(0, prevIndex - 4));
        setEndIndex(prevIndex => Math.max(3, prevIndex - 4));
    };

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(repeatedStickers.length - 1, prevIndex + 4));
        setEndIndex(prevIndex => Math.min(repeatedStickers.length - 1, prevIndex + 4));
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
                            <button onClick={handleClick} className='links'>Ver Álbum</button>
                            <button onClick={handleClick2} className='links'>Abrir Sobres</button>
                            <div className="profile-icon-container" onClick={toggleMenu}>
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
            <div className="repes-container">
                <div className='repes-content'>
                    {repeatedStickers.length > 0 && (
                        <div className="page-info-repe">
                            Página {currentPage} de {totalPages}
                        </div>
                    )}
                {repeatedStickers.length > 0 ? (
            <div className="carousel">
                    {repeatedStickers.length > 4 && currentPage !== 1 &&(
                        <button className="prev" onClick={handlePrev}>&#10094;</button>
                    )}
                    {repeatedStickers.slice(startIndex, endIndex + 1).map((sticker, index) => (
                        <img className='repe-image' key={index} src={sticker.image} alt={`Sticker ${sticker.stickerID}`} />
                    ))}
                    {repeatedStickers.length > 4 && currentPage !== totalPages &&(
                        <button className="next" onClick={handleNext}>&#10095;</button>
                    )}
            </div>
        ) : (
            repeatedStickers.length === 0 ? (
                <div>No hay figuritas repetidas</div>
            ) : (
                <div>Cargando...</div>
            )
        )}
                </div>
            </div>
        </div>
    );
};

export default Repetidas;
