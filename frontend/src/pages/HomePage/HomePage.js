import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteProductPage/DeleteProductPage";
import { useProducts } from "../../context/ProductContext";
import styles from "./HomePage.module.css";


const HomePage = () => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { products, loadProducts, removeProduct } = useProducts();

    const init = async () => {
        const token = await login();
        console.log("TOKEN:", token);
        await loadProducts();
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = async () => {
        await removeProduct(selectedId);
        setShowModal(false);
    };

return (
    <div className={styles.container}>
        <h1 className={styles.title}>Product Management</h1>

        <div className={styles.header}>
            <button 
                className={styles.createButton}
                onClick={() => navigate("/product")}
            >
                + Create Product
            </button>
        </div>

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price (on R$)</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock_quantity}</td>
                        <td className={styles.actions}>
                            <button 
                                className={styles.editButton}
                                onClick={() => navigate(`/edit/${product.id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    setSelectedId(product.id);
                                    setShowModal(true);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <DeleteModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
        />
    </div>
    );
};

export default HomePage;
