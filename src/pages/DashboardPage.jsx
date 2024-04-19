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

        if (!token) {
            navigate('/shops/login');
        } else {
            fetchStoreDetails(token).then(data => {
                setStoreDetails(data.name); // 상점 이름을 상태에 저장하도록 수정
            }).catch(error => {
                console.error('상점 정보를 가져올 수 없습니다.', error);
                localStorage.removeItem('Authorization');
                navigate('/shops/login');
            });
        }
    }, [navigate]);

    const goToProducts = () => {
        navigate('/shops/products'); // '등록 상품 목록' 페이지로 이동
    };

    const goToNewProduct = () => {
        navigate('/createproduct'); // '새 상품 등록' 페이지로 이동
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