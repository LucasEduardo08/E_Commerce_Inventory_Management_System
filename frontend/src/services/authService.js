import axios from "axios";


export const login = async () => {
    try {
        console.log("ENV FRONT:", process.env.REACT_APP_ADMIN_USER, process.env.REACT_APP_ADMIN_PASS);

        const response = await axios.post(process.env.REACT_APP_LOCALHOST, {
            username: process.env.REACT_APP_ADMIN_USER,
            password: process.env.REACT_APP_ADMIN_PASS,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);

        return token;
    } catch (error) {
        console.error("Erro ao autenticar:", error);
    }
};
