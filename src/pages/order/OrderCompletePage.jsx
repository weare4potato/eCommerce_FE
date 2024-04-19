import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { completeOrder } from '../../api/OrderApi'; // completeOrder 함수를 가져옵니다.
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderCompletePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 주문 정보와 결제 정보를 가져옴
    const { receiver, paymentType, totalAmount } = location.state.order; // 주문 정보에서 받는 사람과 결제 정보를 가져옵니다.
    useEffect(() => {

        // 주문을 생성
        completeOrder({ receiver, paymentType, totalAmount })
            .then(() => {
            })
            .catch((error) => {
                console.error('주문 생성에 실패했습니다:', error);
            });
    }, [receiver, paymentType, totalAmount]);

    return (
        <StyledContainer>
            <h1>주문이 완료되었습니다</h1>
            <div>
                <h2>수령인 정보</h2>
                <p>받는 사람: {receiver.name}</p>
                <p>전화번호: {receiver.phone}</p>
                <p>받는 주소: {receiver.city} {receiver.street} {receiver.detail} {receiver.zipcode}</p>
            </div>
            <div>
                <h2>결제 정보</h2>
                <p>결제 유형: {paymentType}</p>
                <p>주문금액: {totalAmount} 원</p>
                <p>배송비: +0 원</p>
                <p>총 결제 금액: {totalAmount} 원</p>
            </div>
            <ButtonGroup>
            <button onClick={() => navigate('/orders')} className="btn btn-primary">주문 목록으로</button>
                <button onClick={() => navigate('/')} className="btn btn-secondary">메인 페이지로</button>
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
    margin-top: 20px;
`;

export default OrderCompletePage;
