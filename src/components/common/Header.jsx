import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light container">
                <a className="navbar-brand" href="/" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}>BrandLogo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/home" onClick={(e) => {
                                e.preventDefault();
                                navigate('/home');
                            }}>Home</a>
                        </li>
                        {/* Other navigation links */}
                    </ul>
                    <div className="navbar-nav">
                        <button className="btn btn-outline-primary me-2" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign-up</button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;