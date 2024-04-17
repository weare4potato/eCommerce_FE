import api from '../axios/api';

// 주문을 생성하는 API 호출 함수
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('주문 생성에 실패했습니다.', error);
        throw error;
    }
};


// 주문 완료 페이지 API 호출 함수
export const completeOrder = async (orderId) => {
    try {
        const response = await api.get('/api/v1/orders/${orderId}/complete');
        return response.data;
    } catch (error) {
        console.error('주문 생성에 실패했습니다.', error);
        throw error;
    }
};

// 주문 목록 페이지 API 호출 함수
export const getOrders = async (orderData) => {
    try {
        const response = await api.get('/api/v1/orders');
        return response.data;
    } catch (error) {
        console.error('주문 내역 불러오기에 실패했습니다.', error);
        throw error;
    }
};
