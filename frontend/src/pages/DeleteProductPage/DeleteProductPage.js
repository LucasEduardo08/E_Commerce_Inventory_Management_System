import styles from "./DeleteProductPage.module.css";


const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Are you sure?</h3>
                <p className={styles.text}>
                    This action cannot be undone.
                </p>

                <div className={styles.actions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button 
                        className={styles.deleteButton}
                        onClick={onConfirm}
                    >
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
