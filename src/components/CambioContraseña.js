import React, { useState, useEffect } from 'react';
import './OlvidoContraseña.css'; 
import Image from '../copa4.jpg';
import { Navigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';

const CambioContraseña = ({ albumId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [goToMenu, setGoToMenu] = useState(false);
    const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Las contraseñas no coinciden.');
        } else {
            setEmail('');
            setPassword('');
            setPassword2('');
            changePassword(email, password);
        }
    };
    
    const changePassword = async (email, newPassword) => {
        try {
            const response = await fetch(`https://localhost:7172/api/ForgotPassword/ChangePassword?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, newPassword })
            });
    
            if (!response.ok) {
                setError('El correo electrónico no está registrado.');
                throw new Error('Hubo un problema al cambiar la contraseña.');
            }
                const data = await response.json();
                setRecoveryEmailSent(true);
                setSuccess(true);
                console.log(data);

                setTimeout(() => {
                    setGoToMenu(true);
                }, 2000); 
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        let timeout;
        if (error) {
            timeout = setTimeout(() => {
                setError('');
                setSuccess(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [error]);



    if (goToMenu) {   
            return <Navigate to="/"/>;       
    }

    return (
        <div className="full-container">
            <div className="container-image">
                <img className='copa-image' src={Image} alt='copa-image'/>
            </div>
            <div className='container-form'>
                <div className='form'>
                    <div className='title-container'>
                        <h1 className='title'>Cambiá tu contraseña</h1>
                        <p className='subtitle'>Ingresá tu nueva contraseña para seguir disfrutando!</p>
                    </div>
                    {error && (
                        <Alert severity="error" style={{ height: 'auto', borderRadius: '15px' }}>
                            <AlertTitle style={{ fontSize: '15px' }}>{error}</AlertTitle>
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" style={{ height: 'auto', borderRadius: '15px' }}>
                            <AlertTitle style={{ fontSize: '15px' }}>Contraseña cambiada correctamente</AlertTitle>
                        </Alert>
                    )}
                    <form onSubmit={handleChangePassword}>
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
                        <div className="form-group">
                            <label htmlFor="password">Contraseña nueva</label>
                            <input type="password" 
                                id="password" 
                                name="password" 
                                placeholder='Ingresar contraseña' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirmar contraseña</label>
                            <input type="password" 
                                id="password2" 
                                name="password2" 
                                placeholder='Ingresar contraseña nuevamente' 
                                value={password2} 
                                onChange={(e) => setPassword2(e.target.value)} 
                                required 
                            />
                        </div>
                        <button className='login-button' type="submit">Cambiar contraseña</button>
                    </form>
                    <div className='footer-form'>
                        <a href="/"> Volver a la página principal</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CambioContraseña;
