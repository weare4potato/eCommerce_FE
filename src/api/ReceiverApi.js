import api from "../axios/api";

export const getReceivers = async () => {
    try {

        let token = localStorage.getItem("Authorization");
        const response = await api.get('/api/v1/users/receivers');
        console.log(response);
        return response.data
    } catch (error) {
        throw error;

    }
};
export const getReceiver = async (receiverId) => {
    try {

        let token = localStorage.getItem("Authorization");
        const response = await api.get(`/api/v1/users/receivers/${receiverId}`);
        console.log(response);
        return response.data
    } catch (error) {
        throw error;

    }
};

export const createReceiver = async (ReceiverData) => {
    try {
        const response = await api.post('/api/v1/users/receivers', ReceiverData);

        return response.data;

    } catch (error) {
        console.error('생성을 실패했습니다 .', error);
        throw error;
    }
};

export const updateReceiver = async (receiverId, ReceiverData) => {
    try {
        const response = await api.put(`/api/v1/users/receivers/${receiverId}`, ReceiverData)

        return response.data;

    } catch (error) {
        console.error('수정을 실패했습니다 .', error);
        throw error;
    }
};

export const deleteReceiver = async (receiverId) => {
    try {
        const response = await api.delete(`/api/v1/users/receivers/${receiverId}`)

        return response.data;

    } catch (error) {
        console.error('삭제를 실패했습니다 .', error);
        throw error;
    }
};