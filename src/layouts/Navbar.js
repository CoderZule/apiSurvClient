import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, getUserById } from '../actions/userActions';
import { Redirect, Link } from 'react-router-dom';
import io from 'socket.io-client';

export default function Navbar() {
    const currentUser = useSelector(state => state.loginUserReducer.currentUser);

    const dispatch = useDispatch();

    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const getUserByIdState = useSelector(state => state.getUserByIdReducer);
    const { user } = getUserByIdState;

    useEffect(() => {
        if (currentUser) {
            const { _id } = currentUser;
            dispatch(getUserById(_id));
        }
    }, [dispatch, currentUser]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        const socket = io('http://localhost:3000');

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (user) {
            const { Firstname, Lastname } = user;
            setFirstname(Firstname);
            setLastname(Lastname);
        }
    }, [user]);




    if (!currentUser) {
        // Redirect to login page if user is not authenticated
        return <Redirect to="/" />;
    }


    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2  d-lg-inline text-gray-600 small">{Firstname} {Lastname}</span>
                        <img className="img-profile rounded-circle" src="/img/undraw_profile.svg" alt="Profile" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="/admin/profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profil
                        </Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Se déconnecter
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
