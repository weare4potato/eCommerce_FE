import api from "../axios/api";

export const createBusinessNumber = async () => {
    try {
        const response = await api.post('/api/v1/revenue');

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('발급에 실패했습니다.', error);
        throw error;
    }
};