import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Album.css';
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';
import Copa from '../copa-sticker.jpg'
import './Copa.css'
import Arg from '../components/Countries/Argentina/arg.png'
import Bra from '../components/Countries/Brasil/bra.png'
import Ita from '../components/Countries/Italia/ita.png'
import Ale from '../components/Countries/Alemania/ale.png'
import Fra from '../components/Countries/Francia/fra.png'
import Uru from '../components/Countries/Uruguay/uru.png'
import Ing from '../components/Countries/Inglaterra/ing.png'
import Esp from '../components/Countries/España/esp.png'

const Album = ({albumId, setSavedStickers, setPastedStickers}) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar el número de página actual
    const [stickerCount, setStickerCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cardStickerMapping, setCardStickerMapping] = useState({});
    const navigate = useNavigate();
    const totalStickers = 84; // Total de stickers en el álbum
    const progressBar = (stickerCount / totalStickers) * 100;
    
    const cards = Array.from({ length: 12 }, (_, index) => index + 1);
    // Dividir el array en dos grupos de 6 elementos cada uno
    const firstRow = cards.slice(0, 1);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleClick = () => {
      navigate('/abrir-sobres');
    };

    const handleClick2 = () => {
        navigate('/repetidas');
      };

     
    // Función para obtener los stickers pegados por álbum
    const getPastedStickers = async () => {
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/GetPastedStickers?albumId=${albumId}`);
            if (response.ok) {
                const pastedStickersData = await response.json();
                setPastedStickers(pastedStickersData);
                const stickersPegados = pastedStickersData.length;
                setStickerCount(stickersPegados);
            } else {
                console.error('Error al obtener los stickers pegados:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    // Función para obtener los stickers guardados por álbum
    const fetchSavedStickers = async (event) => {
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/GetSaveStickers?albumId=${albumId}`);
            if (response.ok) {
                const data = await response.json();
                const mapping = {};
                data.forEach(sticker => {
                    mapping[sticker.stickerID] = true;
                });
                setCardStickerMapping(mapping);
                setSavedStickers(data); // Actualizar el estado con los stickers guardados 
            } else {
                console.log('No hay stickers guardados');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        fetchSavedStickers(albumId); 
        getPastedStickers(albumId);
    }, [albumId]); //

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
            <div className='copa-album'>
                <div className='text-container'>
                    <div className='cup-title'>
                    <h1 className='album-title-cup'>Álbum de Campeones del Mundo</h1>
                    </div>
                <div className="row-champions-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-champions-cup">
                                <div className='page-album' ><strong>1</strong></div>                     
                            <table className="table-champions">
                                <thead>
                                    <tr>
                                        <th>ㅤㅤ</th>
                                        <th>Ganadores</th>
                                        <th>ㅤㅤ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className='country-flag' src={Bra} alt="Brasil" /></td>
                                        <td className='country-name'>Brasil</td>
                                        <td><b>5</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Ale} alt="Alemania"/></td>
                                        <td className='country-name'>Alemania</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Ita} alt="Italia"/></td>
                                        <td className='country-name'>Italia</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Arg} alt="Argentina"/></td>
                                        <td className='country-name'>Argentina</td>
                                        <td><b>3</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Uru} alt="Uruguay" /></td>
                                        <td className='country-name'>Uruguay</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Fra} alt="Francia"/></td>
                                        <td className='country-name'>Francia</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Ing} alt="Inglaterra"/></td>
                                        <td className='country-name'>Inglaterra</td>
                                        <td><b>1</b></td>
                                    </tr>
                                    <tr>
                                        <td><img className='country-flag' src={Esp} alt="España" /></td>
                                        <td className='country-name'>España</td>
                                        <td><b>1</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        ))}
                    </div>
                </div>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressBar}%` }}>
                        {progressBar.toFixed(2)}%
                    </div>
                </div>
                    <div className="row1-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-cup-sticker">
                            </div>                     
                        ))}
                        <div className="cup-text">
                            Copa del Mundo
                        </div>
                    </div>      
                </div>
            </div>
            {/* Flechas para navegar entre las páginas */}
            <div className="navigation-arrows">
                <Link to='/argentina'>
                <button className="boton-album boton-derecho"> &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default Album;
