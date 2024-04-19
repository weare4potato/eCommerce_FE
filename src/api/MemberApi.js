import api from "../axios/api";

export const memberSignIn = async (MemberData) => {
    try {
        const response = await api.post('/api/v1/users/signin', MemberData);

        return response.data
    } catch (error) {
        throw error;

    }
};

export const memberSignUp = async (MemberData) => {
    try {
        const response = await api.post('/api/v1/users/signup', MemberData);
        console.log("로그인 성공!");
        return response.data;
    } catch (error) {
        console.error('로그인을 실패했습니다.', error);
        throw error;
    }
};

// 현재 로그인한 사용자의 정보를 가져오는 API
export const getCurrentUser = async (token) => {
    try {
        const response = await api.get('/api/v1/users', {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('유저를 찾을 수 없습니다.', error);
        throw error;
    }
};
