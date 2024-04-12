import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AbrirSobres.css';
import Image2 from '../foto-login.jpg';
import Flecha from '../flecha+texto.png'
import Icon from '../icon.png';
import Icon2 from '../flecha-abajo.png';
import Icon3 from '../cerrar-sesion.png';
import Swal from 'sweetalert2'; 

const AbrirSobres = ({albumId}) => {
    const [showFotos, setShowFotos] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [randomImages, setRandomImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [disableOpenSobre, setDisableOpenSobre] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleClickSobre = async () => {
        if (!disableOpenSobre) {
            await getRandomImages();
            setShowFotos(true);
            setDisableOpenSobre(true);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSave = () => {
        if (!showAlert) {
            handleContinue();
            navigate('/my-album');
        } else {
            setShowAlert(true);
            handleContinue();
        }
    }
    const handleClick = () => {
        navigate('/my-album');
    };
  
    const handleClick2 = () => {
        navigate('/repetidas');
    };
    
    const handleAlert = () => {
        navigate('/my-album');
    }

    const handleContinue = async (event) => {
        if (!isProcessing) {
            setIsProcessing(true);
            try {
                const response = await fetch(`https://www.stickeralbum.somee.com/api/Stickers/SaveStickers?albumId=${albumId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(randomImages)        
                });
    
                if (response.ok) {
                    console.log('fotos guardadas')
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            } finally {
                setIsProcessing(false);
                setDisableOpenSobre(false);
                setShowAlert(false);
            }
        }
    };    

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

    useEffect(() => {
        const shouldShowAlert = localStorage.getItem('showAlert') !== 'false';
    
        if (showAlert && shouldShowAlert) {
            Swal.fire({
                title: 'A tener en cuenta...',
                html: `
                    <p>Las figuritas guardadas luego de abrir un sobre se deben pegar en sus correspondientes lugares marcados por el contorno ROJO en el álbum. Si obtiene una figurita que ya tiene pegada en su álbum, la misma se encontrara en la sección Repetidas.</p>
                    <input type="checkbox" id="dontShowAgain" />
                    <label for="dontShowAgain">No volver a mostrar este mensaje</label>
                `,
                icon: 'info',
                confirmButtonText: 'Continuar',
                preConfirm: () => {
                    const dontShowAgain = document.getElementById('dontShowAgain').checked;
                    if (dontShowAgain) {
                        localStorage.setItem('showAlert', 'false');
                        setShowAlert(false);
                    }
                    handleAlert();
                }
            });
        }
    }, [showAlert]);

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
                        <img src={Flecha} className="flecha" alt='flecha'/>
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
                                    <button className='continue-button-openpacks' onClick={handleSave} disabled={isProcessing}>Guardar</button>
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