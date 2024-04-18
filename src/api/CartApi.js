import api from '../axios/api';
import {getCurrentUser} from "./MemberApi";

export const addToCart = async (productId, quantity, token) => {
    try {
        // 현재 사용자 정보를 서버에서 가져오는 함수를 가정합니다.
        const currentUser = await getCurrentUser(token);
        const memberId = currentUser.id;

        const requestData = {
            memberId,
            productId,
            quantity,
        };
        console.log('Final Request Data being sent:', requestData);

        const response = await api.post('/api/v1/carts', requestData, {
            headers: {
                Authorization: token
            }
        });

        console.log('Response from addToCart:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 추가 실패:', error);
        throw error;
    }
};

export const getCarts = async () =>{
    try {
        const response = await api.get('/api/v1/carts')
        return response.data
    }catch (error){
        throw error;
    }
}

export const deleteCart = async (id) => {
    try {
        const response = await api.delete(`/api/v1/carts/${id}`)
        return response.data
    }catch (error){
        throw error;
    }
}