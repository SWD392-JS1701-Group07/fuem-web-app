import { toast } from "@/components/ui/use-toast";
import { RefreshTokenCredentials } from "@/constants/models/common";
import axios, { AxiosResponse } from "axios";

const baseURL = "https://localhost:7297";

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Check if the request data is FormData
        if (config.data instanceof FormData) {
            config.headers.Accept = "gzip, deflate, br";
            config.headers["Content-Type"] = "multipart/form-data";
            // No need to set Content-Type for FormData, it will be automatically set
        } else {
            config.headers.Accept = "application/json";
            config.headers["Content-Type"] = "application/json";
        }
        console.log('config: ', config);
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error) => {
        console.log(error.response);
        if (error.response === 401) {
            console.log("Refresh token");
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            if (accessToken && refreshToken) {
                const credentials: RefreshTokenCredentials = {
                    accessToken,
                    refreshToken,
                };
                const response = await axiosClient.post(
                    "/api/v1/users/RefreshToken",
                    credentials
                );
                if (response.data) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("refreshToken", response.data.refreshToken);
                    //toast("Refresh token successfully");
                    return axiosClient.request(error.config);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;