import api from '../axios/api';


export const storeSignIn = async (StoreData) => {
    try {
        const response = await api.post('/api/v1/shops/signin', StoreData);

        return response.data
    } catch (error) {
        throw error;

    }
};

export const storeSignUp = async (StoreData) => {
    try {
        const response = await api.post('/api/v1/shops/signup', StoreData);
        return response.data;
    } catch (error) {
        console.error('로그인을 실패했습니다.', error);
        throw error;
    }
};

// 상점 정보를 가져오는 API 호출 함수
export const fetchStoreDetails = async () => {
    try {
        const token = localStorage.getItem('Authorization');
        const response = await api.get('/api/v1/shops', {
            headers: {
                "Content-Type": "application/json",
                Authorization: token } ,
        });
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

// 등록한 상품을 가져오는 API 호출 함수
export const fetchStoreProducts = async (page = 0, size = 10) => {
    try {
        const token = localStorage.getItem('Authorization');
        const params = { page, size };

        const response = await api.get('/api/v1/shops/products', {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('등록 상품 조회 실패.', error);
        throw error;
    }
};