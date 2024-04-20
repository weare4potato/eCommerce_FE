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
export const getOrders = async (page = 0, size = 10) => {
    try {
        const token = localStorage.getItem('Authorization');
        const params = { page, size };

        const response = await api.get('/api/v1/orders', {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('주문 목록 조회 실패.', error);
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

export const getTotalAmount = async (state) => {
    try {
        if (Array.isArray(state)) {
            // 상태가 배열인 경우
            return state.reduce((accumulator, item) => {
                console.log(item.price);
                return accumulator + (item.price * item.quantity);
            }, 0);
        } else if (typeof state === 'object' && state !== null) {
            // 상태가 단일 객체인 경우
            console.log(state.price);
            return state.price * state.quantity;
        } else {
            throw new Error('올바른 상태가 아닙니다.');
        }
    } catch (error) {
        console.error('상품 정보를 가져오는데 실패했습니다.', error);
        throw error;
    }
}