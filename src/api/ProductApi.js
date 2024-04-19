import api from '../axios/api';

// 새 상품을 등록하는 API 호출 함수
export const createProduct = async (productData, token) => {
    try {
        const response = await api.post('/api/v1/products', productData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('새 상품을 등록하는데 실패했습니다.', error);
        throw error;
    }
};

// 모든 상품을 불러오는 API 호출 함수
export const getAllProducts = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`/api/v1/products/all`, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error('상품을 불러올 수 없습니다.', error);
        return [];
    }
};

// 카테고리 ID로 특정 상품을 불러오는 API 호출 함수
export const getProductsByCategory = async (categoryId, page = 0, size = 10) => {
    try {
        const response = await api.get(`/api/v1/products/categories`, {
            params: { productCategoryId: categoryId, page, size },
        });
        return response.data;
    } catch (error) {
        console.error('상품을 불러올 수 없습니다.', error.response || error);
        throw error;
    }
};

// 상품 ID로 상품 상세 정보를 불러오는 API 호출 함수
export const getProductDetails = async (productId) => {
    try {
        const response = await api.get(`/api/v1/products/details/${productId}`);
        return response.data;
    } catch (error) {
        console.error("상품의 상세 정보를 불러올 수 업습니다.", error.response || error);
        throw error;
    }
};

// 상점 ID로 상점의 상품을 불러오는 API 호출 함수
export const getProductsByShop = async (shopId, page = 0, size = 10) => {
    try {
        const response = await api.get(`/api/v1/products/shops/${shopId}`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.error("상품을 불러올 수 없습니다.", error.response || error);
        throw error;
    }
};

// 상품 ID로 상품을 수정하는 API 호출 함수
export const updateProduct = async (productId, productData, token) => {
    try {
        const response = await api.put(`/api/v1/products/${productId}`, productData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('상품 수정 실패.', error);
        throw error;
    }
};

// 상품 ID로 상품을 삭제하는 API 호출 함수
export const deleteProduct = async (productId, token) => {
    try {
        const response = await api.delete(`/api/v1/products/${productId}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('상품 삭제 실패.', error);
        throw error;
    }
};