import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoreDetails } from '../api/StoreApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

function DashboardPage() {
    const [storeDetails, setStoreDetails] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        console.log('Token from localStorage:', token); // Step 1: 콘솔에서 토큰 출력하여 확인

        if (!token) {
            console.log('No token found, redirecting to login'); // 로그인 토큰 없음 로그
            navigate('/shops/login');
        } else {
            fetchStoreDetails(token).then(data => { // Step 2: 함수에 토큰을 인자로 전달
                console.log('Store Details:', data); // 서버로부터 받은 데이터 로그
                setStoreDetails(data.name); // 상점 이름을 상태에 저장하도록 수정
            }).catch(error => {
                console.error('Failed to fetch store details:', error); // Step 3: 에러 로그
                localStorage.removeItem('Authorization');
                navigate('/shops/login');
            });
        }
    }, [navigate]);

    const goToProducts = () => {
        navigate('/products'); // '등록 상품 목록' 페이지로 이동
    };

    const goToNewProduct = () => {
        navigate('/new-product'); // '새 상품 등록' 페이지로 이동
    };

    return (
        <StyledContainer>
            <h1>{storeDetails}</h1>
            <ButtonGroup>
                <button onClick={goToProducts} className="btn btn-primary btn-lg">등록 상품 목록</button>
                <button onClick={goToNewProduct} className="btn btn-secondary btn-lg">새 상품 등록</button>
            </ButtonGroup>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;



export default DashboardPage;