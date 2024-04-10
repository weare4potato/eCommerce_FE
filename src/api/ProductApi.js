import api from '../axios/api';

// 새 상품을 등록하는 API 호출 함수
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('새 상품을 등록하는데 실패했습니다.', error);
        throw error;
    }
};