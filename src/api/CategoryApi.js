import api from '../axios/api';

export const getOneDepthCategories = async () => {
    try {
        const response = await api.get('/api/v1/categories/oneDepth');
        return response.data;
    } catch (error) {
        console.error('대분류 카테고리를 불러올 수 없습니다.', error);
        return [];
    }
};

export const getTwoDepthCategories = async (oneDepthId) => {
    try {
        const response = await api.get(`/api/v1/categories/twoDepth/${oneDepthId}`);
        return response.data;
    } catch (error) {
        console.error('중분류 카테고리를 불러올 수 없습니다.', error);
        return [];
    }
};

export const getThreeDepthCategories = async (twoDepthId) => {
    try {
        const response = await api.get(`/api/v1/categories/threeDepth/${twoDepthId}`);
        return response.data;
    } catch (error) {
        console.error('소분류 카테고리를 불러올 수 없습니다.', error);
        return [];
    }
};