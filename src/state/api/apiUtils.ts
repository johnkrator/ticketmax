import {AxiosError} from "axios";
import type {ApiError} from "@/state/api/types/api.ts";

// Define the error response type locally to avoid circular dependency
interface AxiosErrorResponse {
    response?: {
        data: ApiError;
        status: number;
        statusText: string;
    };
    message: string;
    code?: string;
}

// Generic API utilities
export const apiUtils = {
    // Handle API errors consistently
    handleError: (error: AxiosError<AxiosErrorResponse>): string => {
        if (error.response?.data?.message) {
            if (Array.isArray(error.response.data.message)) {
                return error.response.data.message.join(", ");
            }
            return error.response.data.message;
        }
        if (error.message) {
            return error.message;
        }
        return "An unexpected error occurred";
    },

    // Check if the user is authenticated
    isTokenValid: (): boolean => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            // Basic token format validation
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp > currentTime;
        } catch {
            return false;
        }
    },

    // Get current environment
    getEnvironment: (): "development" | "production" => {
        return import.meta.env.MODE === "development" ? "development" : "production";
    },

    // Get API base URL
    getBaseURL: (): string => {
        return import.meta.env.MODE === "development"
            ? "http://localhost:3500"
            : "https://ticketmax-api.vercel.app";
    },

    // Format error messages for display
    formatErrorMessage: (error: AxiosError<AxiosErrorResponse>): string => {
        if (Array.isArray(error.response?.data?.message)) {
            return error.response.data.message.join(", ");
        }
        return apiUtils.handleError(error);
    },

    // Retry mechanism for failed requests
    retryRequest: async <T>(
        requestFn: () => Promise<T>,
        maxRetries: number = 3,
        delay: number = 1000
    ): Promise<T> => {
        let lastError: AxiosError<AxiosErrorResponse>;

        for (let i = 0; i <= maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                lastError = error as AxiosError<AxiosErrorResponse>;
                if (i < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
                }
            }
        }

        throw lastError!;
    }
};

// Environment configuration
export const config = {
    isDevelopment: import.meta.env.MODE === "development",
    isProduction: import.meta.env.MODE === "production",
    apiBaseUrl: apiUtils.getBaseURL(),
    swaggerUrl: import.meta.env.MODE === "development"
        ? "http://localhost:3500/api"
        : "https://ticketmax-api.vercel.app/api",
};

export default apiUtils;
