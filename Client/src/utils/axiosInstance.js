import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 10 seconds timeout
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
});

// request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            if(error.response.status === 401){
                // handle unauthorized access, e.g., redirect to login
                window.location.href = "/";
            }else if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
         }else if(error.code === 'ECONNABORTED'){
            console.error("Request timeout. Please try again.");
         }
        
         return Promise.reject(error);
        }
);

export default axiosInstance;