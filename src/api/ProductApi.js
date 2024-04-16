import api from '../axios/api';

// 새 상품을 등록하는 API 호출 함수
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/api/v1/products', productData);
        return response.data;
    } catch (error) {
        console.error('새 상품을 등록하는데 실패했습니다.', error);
        throw error;
    }
};

// 모든 상품을 불러오는 API 호출 함수
export const getAllProducts = async () => {
    try {
        const response = await api.get(`/api/v1/products/all`);
        console.log('getAllProducts response:', response.data); // 콘솔에 데이터 로깅
        return response.data.content; // 'content' 필드가 기대하는 데이터를 포함하고 있는지 확인
    } catch (error) {
        console.error('상품을 불러올 수 없습니다.', error);
        return []; // 에러가 발생하면 빈 배열 반환
    }
};

// 카테고리 ID로 특정 상품을 불러오는 API 호출 함수
export const getProductsByCategory = async (categoryId, page = 0, size = 10) => {
    try {
        console.log("Calling API with:", categoryId, page, size); // 매개변수 로깅
        const response = await api.get(`/api/v1/products/categories`, {
            params: { productCategoryId: categoryId, page, size },
        });
        console.log("Products by category response:", response); // 응답 로깅
        return response.data;
    } catch (error) {
        console.error("API call error:", error.response || error); // 오류 로깅
        throw error; // 오류를 상위로 전파
    }
};

// 상품 ID로 상품 상세 정보를 불러오는 API 호출 함수
export const getProductDetails = async (productId) => {
    try {
        const response = await api.get(`/api/v1/products/details/${productId}`);
        console.log("Product details response:", response); // 응답 로깅
        return response.data; // API 응답에서 바로 데이터를 반환
    } catch (error) {
        console.error("Failed to fetch product details:", error.response || error); // 오류 로깅
        throw error; // 오류를 상위로 전파
    }
};

// 상점 ID로 상점의 상품을 불러오는 API 호출 함수
export const getProductsByShop = async (shopId, page = 0, size = 10) => {
    try {
        const response = await api.get(`/api/v1/shops/${shopId}/shop-products`, {
            params: { shopId, page, size }
        });
        console.log("Products by shop response:", response);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products for shop:", error.response || error);
        throw error;
    }
};