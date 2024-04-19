import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getOrders} from "../../api/OrderApi";
import styled from 'styled-components';

function OrderListPage(token) {
    const [orders, setOrders] = useState([]); // 주문 목록을 저장할 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders(currentPage - 1, size);

                if (response && response.content && response.totalPages) {
                    setOrders(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setOrders([])
                }
                ;
            } catch (error) {
                console.error('주문을 불러올 수 없습니다.', error);
                setOrders([]);
            }
        };
        fetchOrders();
    }, [currentPage, size]);

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <StyledContainer>
            <h1>주문 목록</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.orderId}>
                        주문 번호: {order.orderNum}, 상태: {order.status}, 주문 일자: {order.orderedAt}
                    </li>
                ))}
            </ul>
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <a onClick={() => setCurrentPage(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
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