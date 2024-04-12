import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AbrirSobres.css';
import Image2 from '../foto-login.jpg';
import Flecha from '../flecha+texto.png'
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';

const AbrirSobres = ({albumId}) => {
    const [showFotos, setShowFotos] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [randomImages, setRandomImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [disableOpenSobre, setDisableOpenSobre] = useState(false);
    const navigate = useNavigate();

    const handleClickSobre = async () => {
        if (!disableOpenSobre) { // Verificar si se debe permitir abrir un sobre
            await getRandomImages();
            setShowFotos(true);
            setDisableOpenSobre(true); // Deshabilitar el botón de abrir sobres
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para manejar la selección de imágenes
    const handleImageSelect = (imageUrl) => {
        setSelectedImages(prevSelectedImages => [...prevSelectedImages, imageUrl]);
    };

    const handleClick = () => {
        navigate('/my-album');
    };
  
    const handleClick2 = () => {
      navigate('/repetidas');
    };
    
    const handleContinue = async (event) => {
        if (!isProcessing) {
            setIsProcessing(true); // Indicar que el proceso está en curso
            try {
                // Lógica para enviar los stickers seleccionados al backend
                const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/SaveStickers?albumId=${albumId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(randomImages)        
                });
    
                if (response.ok) {
                    // Si la solicitud es exitosa, navegar a '/my-album'
                    navigate('/my-album');
                } else {
                    // Si hay un error en la respuesta, mostrar un mensaje de error
                    console.error('Error en la solicitud:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            } finally {
                setIsProcessing(false);
                setDisableOpenSobre(false);
            }
        }
    };    

        // Función para obtener las imágenes aleatorias del backend
        const getRandomImages = async () => {
            try {
                const response = await fetch('https://www.stickeralbum.somee.com/api/Stickers/RandomImage');
                if (response.ok) {
                    const data = await response.json();
                    setRandomImages(data);
                } else {
                    console.error('Error al obtener las imágenes aleatorias:', response.statusText);
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
                    <Link to="/loggeado" className='sticka-link'>
                        <h1 className='sticka'>StickA</h1>
                    </Link>
                    </div>
                    <div className='icon-container'>
                        <div className="right-section">
                            <button onClick={handleClick} className='links'>Ver Álbum</button>
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
                <div className="sobre-container">
                    <div className='left-container'>
                        <div className='modal-back2' onClick={handleClickSobre}>
                            <div className="modal-content2">
                                <img className="modal-image2" src={Image2} alt="Sobre" />
                            </div>
                        </div>                         
                    </div>
                    <div className='flecha-container'>
                        <img src={Flecha} className="flecha"/>
                    </div>      
                    <div className='right-container'>
                        {showFotos && (
                            <div className='container-foto-button'>
                            <div className="fotos-container">
                            {randomImages.map((imageUrl, index) => (
                                <img key={index} className="foto" src={imageUrl} alt={`Foto ${index + 1}`} />
                            ))}
                            </div>
                                <div className='continue-button-container'>
                                    <button className='continue-button-openpacks' onClick={handleContinue} disabled={isProcessing}>Continuar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbrirSobres;
