import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import styles from "./EditProductPage.module.css";


const EditProductPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { products, editProduct, loadProducts } = useProducts();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: ""
    });

    useEffect(() => {
        if (products.length === 0) {
            loadProducts();
        } else {
            const product = products.find(p => p.id === Number(id));
            if (product) setForm(product);
        }
    }, [products, id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await editProduct(id, {
            ...form,
            price: Number(form.price),
            stock_quantity: Number(form.stock_quantity)
        });

        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Edit Product</h1>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Price (on R$)</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="stock_quantity">Stock Quantity</label>
                            <input
                                id="stock_quantity"
                                type="number"
                                name="stock_quantity"
                                value={form.stock_quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductPage;
