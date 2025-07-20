import {create} from "zustand";
import {persist} from "zustand/middleware";
import {AxiosError} from "axios";
import {api} from "@/state/api/api.ts";
import type {
    ApiError,
    ApiResponse,
    AuthResponse, ChangePasswordDto,
    CreateUserDto,
    ForgotPasswordDto,
    LoginDto,
    ResetPasswordDto, UpdateUserDto, User
} from "@/state/api/types/api.ts";

// Define the error response type locally to match api.ts
interface AxiosErrorResponse {
    response?: {
        data: ApiError;
        status: number;
        statusText: string;
    };
    message: string;
    code?: string;
}

interface AuthState {
    // State
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    // Actions
    register: (userData: CreateUserDto) => Promise<AuthResponse>;
    login: (credentials: LoginDto) => Promise<AuthResponse>;
    logout: () => void;
    verifyEmail: (token: string) => Promise<ApiResponse>;
    forgotPassword: (email: ForgotPasswordDto) => Promise<ApiResponse>;
    resetPassword: (data: ResetPasswordDto) => Promise<ApiResponse>;
    changePassword: (data: ChangePasswordDto) => Promise<ApiResponse>;
    getCurrentUser: () => Promise<User>;
    updateUser: (id: string, data: UpdateUserDto) => Promise<User>;
    getAllUsers: () => Promise<User[]>;
    deleteUser: (id: string) => Promise<ApiResponse>;
    setError: (error: string | null) => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}

const handleApiError = (error: AxiosError<AxiosErrorResponse>): string => {
    return error.response?.data?.message || error.message || "An unexpected error occurred";
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            token: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            // Register user
            register: async (userData: CreateUserDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<AuthResponse>("/user/register", userData);
                    const {user, access_token} = response.data;

                    // Store token in localStorage
                    localStorage.setItem("token", access_token);

                    set({
                        user,
                        token: access_token,
                        isAuthenticated: true,
                        isLoading: false
                    });

                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Login user
            login: async (credentials: LoginDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<AuthResponse>("/user/login", credentials);
                    const {user, access_token} = response.data;

                    // Store token in localStorage
                    localStorage.setItem("token", access_token);

                    set({
                        user,
                        token: access_token,
                        isAuthenticated: true,
                        isLoading: false
                    });

                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Logout user
            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null
                });
            },

            // Verify email
            verifyEmail: async (token: string) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<ApiResponse>(`/user/verify-email/${token}`);
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Forgot password
            forgotPassword: async (emailData: ForgotPasswordDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<ApiResponse>("/user/forgot-password", emailData);
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Reset password
            resetPassword: async (resetData: ResetPasswordDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<ApiResponse>("/user/reset-password", resetData);
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Change password
            changePassword: async (passwordData: ChangePasswordDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.post<ApiResponse>("/user/change-password", passwordData);
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Get current user
            getCurrentUser: async () => {
                const {user} = get();
                if (!user?.id) throw new Error("No user ID available");

                set({isLoading: true, error: null});
                try {
                    const response = await api.get<User>(`/user/${user.id}`);
                    set({user: response.data, isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Update user
            updateUser: async (id: string, updateData: UpdateUserDto) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.patch<User>(`/user/${id}`, updateData);

                    // Update the current user if it's the same user
                    const {user} = get();
                    if (user?.id === id) {
                        set({user: response.data});
                    }

                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Get all users (Admin only)
            getAllUsers: async () => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.get<User[]>("/user");
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Delete user (Admin only)
            deleteUser: async (id: string) => {
                set({isLoading: true, error: null});
                try {
                    const response = await api.delete<ApiResponse>(`/user/${id}`);
                    set({isLoading: false});
                    return response.data;
                } catch (error) {
                    const errorMessage = handleApiError(error as AxiosError<AxiosErrorResponse>);
                    set({error: errorMessage, isLoading: false});
                    throw error;
                }
            },

            // Utility actions
            setError: (error: string | null) => set({error}),
            clearError: () => set({error: null}),
            setLoading: (loading: boolean) => set({isLoading: loading}),
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
