import axios, {AxiosError} from "axios";

// Define the error response type locally to avoid circular dependency
interface AxiosErrorResponse {
    response?: {
        data: {
            message: string | string[];
            statusCode: number;
            error?: string;
        };
        status: number;
        statusText: string;
    };
    message: string;
    code?: string;
}

// Environment-based API configuration
const getBaseURL = () => {
    if (import.meta.env.MODE === "development") {
        return "http://localhost:3500";
    }
    return "https://ticketmax-api.vercel.app";
};

// Create axios instance with default configuration
export const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add an auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<AxiosErrorResponse>) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default api;
