import React, { useState, useEffect } from 'react';
import './Login.css'; 
import Image from '../foto-login.jpg'
import { Link, Navigate} from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import GoogleLogo from '../logo-google.png'
import { GoogleLogin } from '@react-oauth/google';

const Login = ({setAlbumId}) => {

    const [isRegistering, setIsRegistering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [Registred, setRegistred] = useState(false);
    const [registrationHandled, setRegistrationHandled] = useState(false);  //manejo de boton Registrarse para evitar bucle infinito

    // manejo de alertas
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const respuestaGoogle = (respuesta) => {
        console.log(respuesta);
    }

    // Use effect para que solo aparezcan dos segundos las alertas.
    useEffect(() => {
        let timeout;
        if (loginError && !isRegistering) {
            timeout = setTimeout(() => {
                setLoginError(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [loginError, isRegistering]);

    useEffect(() => {
        let timeout;
        if (registerError && isRegistering) {
            timeout = setTimeout(() => {
                setRegisterError(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [registerError, isRegistering]);


    const handleToggleRegistration = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsRegistering(!isRegistering);
            setIsTransitioning(false);
            setFirstName(''); 
            setLastName(''); 
            setEmail(''); 
            setPassword('');
            setRegistrationSuccess(false);
        }, 500); 
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Users/Login?email=${email}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                const albumId = data.album.albumID;
                setEmail(''); 
                setPassword('');
                setLoggedIn(true);
                setAlbumId(albumId);

            } else {
                console.error('Error en el inicio de sesión:', response.statusText);
                setLoginError(true); 
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://www.stickeralbum.somee.com/api/Users/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email, 
                    password: password                   
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                setRegistred(true);
                setRegistrationSuccess(true);

            } else {
                console.error('Error en el registro de usuario:', response.statusText);
                setRegisterError(true); 
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
        }
    };
    
    if (loggedIn) {
        return <Navigate to="/loggeado"/>; //Navigate funciona para llevarme a la ruta al apretar el boton.
    }

    if (Registred && !registrationHandled) {
        handleToggleRegistration(); 
        setRegistrationHandled(true);
    }

    return (
   
        <div className="full-container">
            <div className="container-image">
                <img className='copa-image' src={Image} alt='copa-image'/>
            </div>
            <div className='container-form'>
                <div className='form'>
                    <div className='title-container'>
                        <h1 className='title'>{isRegistering ? 'Registro' : 'Bienvenido!'}</h1>
                        <p className='subtitle'>{isRegistering ? 'Por favor completa tus datos.' : 'Por favor ingresa tus datos.'}</p>
                    </div>
                    {loginError && !isRegistering && (
                        <Alert severity="error" style={{ height: 'auto', borderRadius: '15px' }}>
                            <AlertTitle style={{ fontSize: '15px' }}>Email o contraseña incorrectos</AlertTitle>
                        </Alert>
                    )}
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering && (
                            <>
                            <div className="form-group">
                                <label htmlFor="firstName">Nombre</label>
                                <input type="text" 
                                id="firstName" 
                                name="firstName" 
                                placeholder='Ingresar nombre' 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Apellido</label>
                                <input type="text" 
                                id="lastName" 
                                name="lastName" 
                                placeholder='Ingresar apellido' 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                required />
                            </div>
                            </>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Ingresar email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" 
                            id="password" 
                            name="password" 
                            placeholder='Ingresar contraseña' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required />
                        </div>
                        {!isRegistering && (
                            <div className='forget-pw-container'>
                                <a className='forget-password' href="/olvidaste-contraseña">¿Olvidaste tu contraseña?</a>
                            </div>
                        )}
                         {registrationSuccess && isRegistering &&(
                            <Alert severity="success" style={{ height: 'auto', borderRadius: '15px' }}>
                                <AlertTitle style={{ fontSize: '15px'}}>Registrado correctamente</AlertTitle>
                            </Alert>
                        )}

                        {registerError && isRegistering && (
                            <Alert severity="error" style={{ height: 'auto', borderRadius: '15px' }}>
                                <AlertTitle style={{ fontSize: '15px' }}>Ese email ya está en uso.</AlertTitle>
                            </Alert>
                        )}
                        <button className='login-button' type="submit">{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</button>
                        
                        {!isRegistering && (
                            <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                        )}
                    </form>
                    <div className='footer-form'>{isRegistering ? '¿Ya tenes una cuenta? ' : '¿No tenes una cuenta? '}<a href="#!" onClick={handleToggleRegistration}>{!isRegistering ? 'Registrate' : 'Iniciar sesión'}</a></div>
                </div>
            </div>
        </div>
       
    );
};

export default Login;