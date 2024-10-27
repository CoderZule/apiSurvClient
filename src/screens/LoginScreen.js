import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../actions/userActions";
import { Redirect } from 'react-router-dom';
import Error from "../components/Error";
import Loading from "../components/Loading";
import './Login.css';

const LoginScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowPassword, setShowPassword] = useState(false);  
    const loginState = useSelector((state) => state.loginUserReducer);
    const { loading, error, currentUser } = loginState;  
    const dispatch = useDispatch();

    const login = () => {
        const user = { Email, Password, platform: 'web', };
        dispatch(loginUser(user));
    };
 
    const togglePasswordVisibility = () => {
        setShowPassword(!ShowPassword);
    };

    
    if (currentUser) {
        return <Redirect to="/admin/dashboard" />;
    }

    const handleForgotPassword = () => {
        const confirmed = window.confirm("Voulez-vous vraiment envoyer un email pour réinitialiser votre mot de passe?");
        if (confirmed) {
            const subject = encodeURIComponent('Réinitialisation du mot de passe'); // Encode subject text
            const body = encodeURIComponent('Bonjour,\n\nJe vous prie de réinitialiser mon mot de passe.\n\nCordialement,'); // Encode message body
            window.location.href = `mailto:adminapisurv@gmail.com?subject=${subject}&body=${body}`;
        }
    };

    return (
        <div className='login-screen-box'>
            <img src="/img/logo.png" className="loginlogo" alt="logo" />
            <p className='title'>Connectez-vous à votre compte</p>
            {loading && <Loading />}
            {error && <Error error="Informations invalides" />}
            <div>
                <p className="label">E-mail</p>

                <div className="input-container">
                    <i style={{ color: '#977700' }} className="fas fa-envelope left-icon"></i>

                    <input
                        required
                        type="email"
                        placeholder="exemple@apisurv.com"
                        className="form-control"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <p className="label">Mote de passe</p>

                <div className="input-container">
                    <i style={{ color: '#977700' }} className="fas fa-lock left-icon"></i>
                    <input
                        required
                        type={ShowPassword ? "text" : "password"}  
                        placeholder="********"
                        className="form-control"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={`fas ${ShowPassword ? 'fa-eye' : 'fa-eye-slash'} right-icon`}
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                <button onClick={login} type="submit">Se connecter</button>
                <div className='cont'>
                    <button className='forgetPass' onClick={handleForgotPassword}>
                        Mot de passe oublié?
                    </button>
                </div>


            </div>
        </div>
    );
};

export default LoginScreen;
