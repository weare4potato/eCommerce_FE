import api from '../axios/api';

// 상점 정보를 가져오는 API 호출 함수
export const fetchStoreDetails = async () => {
    try {
        const response = await api.get('/shops');
        return response.data;
    } catch (error) {
        console.error('상점 정보를 가져오는데 실패했습니다.', error);
        throw error;
    }
};

// 상품 목록을 가져오는 API 호출 함수
export const fetchProducts = async (shopId) => {
    try {
        const response = await api.get(`/shops/${shopId}/products`);
        return response.data;
    } catch (error) {
        console.error('상품 목록을 가져오는데 실패했습니다.', error);
        throw error;
    }
};
