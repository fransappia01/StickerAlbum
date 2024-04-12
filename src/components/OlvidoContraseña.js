import React, { useState, useEffect } from 'react';
import './OlvidoContraseña.css'; 
import Image from '../copa4.jpg';
import { Navigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';

const OlvidoContraseña = ({ albumId}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);

    const handleRecoveryPassword = async () => {
        try {
            const response = await fetch('https://www.stickeralbum.somee.com/api/Passwords/ForgotPassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            });

            if (response.ok) {
                setRecoveryEmailSent(true);
            } else {
                setError('El correo electrónico no está registrado.');
            }
        } catch (error) {
            setError('Error al enviar el correo de recuperación.');
            console.error('Error al enviar el correo de recuperación:', error);
        }
    };

    useEffect(() => {
        let timeout;
        if (error ) {
            timeout = setTimeout(() => {
                setError('');
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [error]);


    return (
        <div className="full-container">
            <div className="container-image">
                <img className='copa-image' src={Image} alt='copa-image'/>
            </div>
            <div className='container-form'>
                <div className='form'>
                    <div className='title-container'>
                        <h1 className='title'>Olvidaste tu contraseña?</h1>
                        <p className='subtitle'>No te preocupes, ingresa tu email para iniciar el proceso de recuperación.</p>
                    </div>
                    {error && (
                        <Alert severity="error" style={{ height: 'auto', borderRadius: '15px' }}>
                            <AlertTitle style={{ fontSize: '15px' }}>{error}</AlertTitle>
                        </Alert>
                    )}
                    {recoveryEmailSent && (
                        <Alert severity="success" style={{ height: 'auto', borderRadius: '15px' }}>
                            <AlertTitle style={{ fontSize: '15px' }}>Se envió un email a tu cuenta de correo para recuperar la contraseña</AlertTitle>
                        </Alert>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); handleRecoveryPassword(); }}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" 
                                id="email" 
                                name="email" 
                                placeholder='Ingresar email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <button className='login-button' type="submit">Recuperar contraseña</button>
                    </form>
                    <div className='footer-form'>
                        <a href="/"> Volver a la página principal</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OlvidoContraseña;
