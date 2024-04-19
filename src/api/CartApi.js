import api from '../axios/api';
import {getCurrentUser} from "./MemberApi";

export const addToCart = async (productId, quantity, token) => {
    try {
        const currentUser = await getCurrentUser(token);
        const memberId = currentUser.id;

        const requestData = {
            memberId,
            productId,
            quantity,
        };

        const response = await api.post('/api/v1/carts', requestData, {
            headers: {
                Authorization: token
            }
        });
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