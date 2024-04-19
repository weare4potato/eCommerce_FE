import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {

    // 로그인 여부 확인
    const accessToken = localStorage.getItem('Authorization');

    // 로그인 되었다면 헤더에 토큰 추가.
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
});

instance.interceptors.response.use((response) => {
    // 응답에 토큰이 있다면 토큰 저장
    try {
        const res = response.headers.getAuthorization()
        if (!res) {
            return response;
        }

        localStorage.setItem("Authorization", res);

        return response;
    } catch (e) {
        console.log(e);
    }
});



export default instance;