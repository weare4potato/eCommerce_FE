import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('')

    useEffect(() => {
        const localToken = localStorage.getItem("Authorization");
        setToken(localToken);// 로컬 스토리지에서 토큰이 있는지 확인하여 로그인 상태 설정
    }, [window.location.pathname]);


    const handleLogout = () => {
        localStorage.removeItem('Authorization'); // 로컬 스토리지에서 토큰 삭제
        setToken(''); // 로그인 상태 업데이트
        navigate('/login');
    };

    const handleReceivers = () => {
        navigate('/receiver');
    };

    const handleCarts= () => {
        navigate('/carts');
    };

    return (
        <header className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light container">
                <a className="navbar-brand" href="/" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}>BrandLogo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li>
                            <a className="nav-link" href="/" onClick={(e) => {
                                e.preventDefault();
                                navigate('/shops/login');
                            }}>상점 로그인</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/" onClick={(e) => {
                                e.preventDefault();
                                navigate('/dashboard');
                            }}>대시보드</a>
                        </li>
                    </ul>
                    {!token && (
                        <div className="navbar-nav">
                            <button className="btn btn-outline-primary me-2" onClick={() => navigate('/login')}>Login
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign-up</button>
                        </div>
                    )}
                    {token && (
                        <div className="navbar-nav">
                            <button className="btn btn-outline-primary me-2" onClick={handleCarts}>장바구니</button>
                            <button className="btn btn-outline-primary me-2" onClick={handleReceivers}>주소목록</button>
                            <button className="btn btn-outline-primary me-2" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
};

export default Header;
