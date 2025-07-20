import {useAuthStore} from "../../stores/authStore.ts";
import {UserRole} from "@/state/api/types/api.ts";
import {useEffect} from "react";

export const useAuth = () => {
    const {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changePassword,
        getCurrentUser,
        updateUser,
        getAllUsers,
        deleteUser,
        setError,
        clearError,
        setLoading,
    } = useAuthStore();

    // Initialize auth state on app start
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && !isAuthenticated) {
            // Verify token is still valid by attempting to get the current user
            getCurrentUser().catch(() => {
                logout();
            });
        }
    }, []);

    // Helper functions
    const isAdmin = () => user?.role === UserRole.ADMIN;
    const isOrganizer = () => user?.role === UserRole.ORGANIZER;
    const isUser = () => user?.role === UserRole.USER;

    const hasRole = (role: UserRole) => user?.role === role;
    const hasAnyRole = (roles: UserRole[]) => user ? roles.includes(user.role) : false;

    return {
        // State
        user,
        token,
        isLoading,
        error,
        isAuthenticated,

        // Actions
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changePassword,
        getCurrentUser,
        updateUser,
        getAllUsers,
        deleteUser,
        setError,
        clearError,
        setLoading,

        // Helper functions
        isAdmin,
        isOrganizer,
        isUser,
        hasRole,
        hasAnyRole,
    };
};