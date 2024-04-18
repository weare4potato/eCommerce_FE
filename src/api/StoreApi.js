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
        console.log("로그인 성공!");
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
        console.log('토큰', token);
        const response = await api.get('/api/v1/shops', {
            headers: {
                "Content-Type": "application/json",
                Authorization: token } ,
        });
        console.log('상점 정보', response.data);
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
        console.log('Token:', token); // Log the token to make sure it's correct
        const params = { page, size };
        console.log('Params being sent:', params); // Log the params to make sure they are correct

        const response = await api.get('/api/v1/shops/products', {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        console.log('Registered product list:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve the list of registered products:', error);
        throw error;
    }
};