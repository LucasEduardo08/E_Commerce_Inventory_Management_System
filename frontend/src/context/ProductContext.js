import { createContext, useContext, useState } from "react";
import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from "../services/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const data = await getAllProducts();
        setProducts(data || []);
    };

    const addProduct = async (product) => {
        await createProduct(product);
        await loadProducts();
    };

    const removeProduct = async (id) => {
        await deleteProduct(id);
        await loadProducts();
    };

    const editProduct = async (id, product) => {
        await updateProduct(id, product);
        await loadProducts();
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                removeProduct,
                editProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
