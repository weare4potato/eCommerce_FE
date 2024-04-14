import api from "../axios/api";

export const memberSignIn = async (MemberData) => {
    try {
        const response = await api.post('/api/v1/users/signin', MemberData);
        
        return response.headers.getAuthorization();
    } catch (error) {
        console.error('로그인을 실패했습니다.', error);
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