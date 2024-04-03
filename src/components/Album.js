import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Album.css';
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';
import '../components/Countries/Copa/Copa.css'
import Arg from '../components/Countries/Argentina/arg.png'
import Bra from '../components/Countries/Brasil/bra.png'
import Ita from '../components/Countries/Italia/ita.png'
import Ale from '../components/Countries/Alemania/ale.png'
import Fra from '../components/Countries/Francia/fra.png'
import Uru from '../components/Countries/Uruguay/uru.png'
import Ing from '../components/Countries/Inglaterra/ing.png'
import Esp from '../components/Countries/España/esp.png'

const Album = ({albumId}) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar el número de página actual
    const [menuOpen, setMenuOpen] = useState(false);
    const [savedStickers, setSavedStickers] = useState([]); // Estado para almacenar los stickers guardados
    const [albumStickersMapping, setAlbumStickersMapping] = useState({});
    const navigate = useNavigate();
    
    const cards = Array.from({ length: 12 }, (_, index) => index + 1);

    // Dividir el array en dos grupos de 6 elementos cada uno
    const firstRow = cards.slice(0, 1);

    // Funciones para cambiar de página
    const goToPreviousPage = () => {
        setCurrentPage(prevPage => (prevPage === 1  ? prevPage : prevPage - 1)); // Si está en la primera página, vuelve a la última, de lo contrario, disminuye en 1
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => (prevPage === 5  ? prevPage : prevPage + 1)); // Si está en la última página, vuelve a la primera, de lo contrario, aumenta en 1
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

    // Función para obtener los stickers guardados por álbum
    const fetchSavedStickers = async (event) => {
        try {
            const response = await fetch(`https://localhost:7172/api/Stickers/GetSaveStickers?albumId=${albumId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSavedStickers(data); // Actualizar el estado con los stickers guardados 
            } else {
                console.error('Error al obtener los stickers guardados:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        // Llamar a la función para obtener los stickers guardados cuando se monte el componente
        fetchSavedStickers(albumId); 
    }, [albumId]); //

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
            <div className='copa-album'>
                <div className='text-container'>
                    <div className='cup-title'>
                    <h1 className='album-title-cup'>Álbum de Campeones del Mundo</h1>
                    </div>
                <div className="row-champions-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-champions-cup">
                                <div className='page-album' >1</div>                     
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
                                        <td><img src={Bra} alt="Brasil" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Brasil</td>
                                        <td><b>5</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ale} alt="Alemania" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Alemania</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ita} alt="Italia" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Italia</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Arg} alt="Argentina" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Argentina</td>
                                        <td><b>3</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Uru} alt="Uruguay" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Uruguay</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Fra} alt="Francia" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Francia</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ing} alt="Inglaterra" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Inglaterra</td>
                                        <td><b>1</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Esp} alt="España" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>España</td>
                                        <td><b>1</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        ))}
                    </div>
                </div>
                    <div className="row1-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-cup">
                                 <div className='page-number'>COP{card}</div>
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
                <button className="boton-album boton-izquierdo" onClick={goToPreviousPage}>&lt;</button>
                <Link to='/argentina'>
                <button className="boton-album boton-derecho"> &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default Album;
