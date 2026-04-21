import api from "./apiConfig";


export const getAllProducts = async () => {
    try{
        const response = await api.get("/products");
        return response.data;
    } catch(error){
        console.log(error);
        return [];
    }
};


export const getProduct = async (id) => {
    try{
    const response = await api.get(`/products/${id}`);
    return response.data;
    } catch(error){
        console.log(error);
    }
};



export const createProduct = async (product) => {
    const response = await api.post("/products", product);
    return response.data;
};


export const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
};


export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};