import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("Authorization");

        setIsLogin(!!token); // 로컬 스토리지에서 토큰이 있는지 확인하여 로그인 상태 설정
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('Authorization'); // 로컬 스토리지에서 토큰 삭제
        setIsLogin(false); // 로그인 상태 업데이트
        navigate('/login'); // 로그인 페이지로 이동
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
                        {/* Other navigation links */}
                    </ul>
                    {!isLogin && (
                        <div className="navbar-nav">
                            <button className="btn btn-outline-primary me-2" onClick={() => navigate('/login')}>Login
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign-up</button>
                        </div>
                    )}
                    {isLogin && (
                        <div className="navbar-nav">
                            <button className="btn btn-outline-primary me-2" onClick={handleLogout}>Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
};

export default Header;
