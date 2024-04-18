import api from "../axios/api";

export const getCarts = async () =>{
    try {
        const response = await api.get('/api/v1/carts')
        return response.data
    }catch (error){
        throw error;
    }
}

export const deleteCart = async (id) => {
    try {
        const response = await api.delete(`/api/v1/carts/${id}`)
        return response.data
    }catch (error){
        throw error;
    }
}