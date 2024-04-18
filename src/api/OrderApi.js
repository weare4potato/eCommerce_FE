import api from '../axios/api';

// 주문을 생성하는 API 호출 함수
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/api/v1/orders', orderData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('주문 생성에 실패했습니다.', error);
        throw error;
    }
};


// 주문 완료 페이지 API 호출 함수
export const completeOrder = async (orderId) => {
    try {
        const response = await api.get('/api/v1/orders/${orderId}/complete', {
            headers: { 'Content-Type': 'application/json' }
        });
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

export const getMember = async () => {
    try {
        const token = localStorage.getItem('Authorization');
        const response = await api.get('/api/v1/users');
            // {headers: { Authorization: token }});
        return response.data;
    } catch (error) {
        console.error('유저 정보를 가져오는데 실패했습니다.', error);
        throw error;
    }
};

export const getTotalAmount = async (productDetails) => {
    try{
        return productDetails.reduce((accumulator, productDetail) => {
            return accumulator + (productDetail.price * productDetail.quantity);
        }, 0);
    } catch (error) {
        console.error('상품 정보를 가져오는데 실패했습니다.', error);
        throw error;
    }
}
