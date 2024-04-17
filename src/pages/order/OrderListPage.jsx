import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/OrderApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

function OrderListPage() {
    const [orders, setOrders] = useState([]); // 주문 목록을 저장할 상태
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인된 상태인지 확인
        if (cookies.token) {
            // 주문 목록을 가져오는 함수 호출
            fetchOrders().catch(error => {
                console.error('주문 목록을 불러오는 중 에러 발생:', error);
            });
        } else {
            // 로그인되어 있지 않다면 로그인 페이지로 이동
            navigate('/login');
        }
    }, [cookies.token, navigate]);

    // 주문 목록을 가져오는 함수
    const fetchOrders = async () => {
        try {
            // 주문 목록 가져오기
            const ordersData = await getOrders(cookies.token);
            // 가져온 주문 목록을 상태에 저장
            setOrders(ordersData);
        } catch (error) {
            console.error('주문 목록을 불러오는 중 에러 발생:', error);
        }
    };

    return (
        <StyledContainer>
            <h1>주문 목록</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.orderId}>
                        주문 번호: {order.orderNum}, 상태: {order.orderStatus}, 주문 일자: {order.orderedAt}
                    </li>
                ))}
            </ul>
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

export default OrderListPage;
