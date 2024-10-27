import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../actions/userActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function CreateUser() {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Phone, setPhone] = useState('');
    const [Cin, setCin] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Role, setRole] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const createUserState = useSelector((state) => state.createUserReducer);
    const { error, loading, success } = createUserState;

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);

    function handleCreateUser(e) {
        e.preventDefault();

        const user = {
            Firstname,
            Lastname,
            Phone,
            Cin,
            Email,
            Password,
            Role
        };

        dispatch(createUser(user)).then(() => {

            setFirstname('');
            setLastname('');
            setPhone('');
            setCin('');
            setEmail('');
            setPassword('');
            setRole('');

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }).catch((error) => {

            console.error('Error creating user:', error);
        });
    }

    const namePattern = /^[a-zA-Z' -]+$/;

    function handleFirstnameChange(value) {
        if (namePattern.test(value) || value === '') {
            setFirstname(value);
        }
    }

    function handleLastnameChange(value) {
        if (namePattern.test(value) || value === '') {
            setLastname(value);
        }
    }
    return (
        <div className="row justify-content-center">
            <div className="col-12">
                {loading && <Loading />}


                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Créer Utilisateur</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleCreateUser}>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom</label>
                                <input required type="text" placeholder="Nom" className="form-control" value={Lastname} onChange={e => handleLastnameChange(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prénom</label>
                                <input required type="text" placeholder="Prénom" className="form-control" value={Firstname} onChange={e => handleFirstnameChange(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Tel</label>
                                <PhoneInput

                                    country="FR"
                                    value={Phone}
                                    onChange={setPhone}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Cin</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Cin"
                                    className="form-control"
                                    value={Cin}
                                    onChange={(e) => {
                                         const newValue = e.target.value.replace(/[^0-9]/g, '');
                                        setCin(newValue);
                                    }}
                                />
                            </div>


                            <div className="col-md-6 mb-3">
                                <label className="form-label">Rôle</label>
                                <select name="Role" className="form-select" value={Role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un rôle</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Assistance intermédiaire">Assistance intermédiaire</option>
                                    <option value="Niveau Stratégique">Niveau Stratégique</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input required type="email" placeholder="Email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="form-label">Mot de passe</label>
                                <input required type="password" placeholder="Mot de passe" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='row justify-content-center'>
                                {showSuccess && <Success success="Utilisateur créé avec succès" />}
                                {error && <Error error="Quelque chose s'est mal passé" />}

                                <div className="col-md-4 mb-3">
                                    <button type="submit" className="btn ">Créer</button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
