import api from "../axios/api";

export const getReceivers = async () => {
    try {
        const response = await api.get('/api/v1/users/receivers');

        return response.data
    } catch (error) {
        throw error;

    }
};

export const createReceiver = async (MemberData) => {
    try {
        const response = await api.post('/api/v1/users/receivers', MemberData);


        return response.data;
    } catch (error) {
        console.error('로그인을 실패했습니다.', error);
        throw error;
    }
};