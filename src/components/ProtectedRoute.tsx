import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "@/state/hooks/useAuth";
import {UserRole} from "@/state/api/types/api";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    requiredRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                                  children,
                                                                  requiredRole,
                                                                  requiredRoles
                                                              }) => {
    const {isAuthenticated, user, isLoading} = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-app-background flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    // Check single role requirement
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace/>;
    }

    // Check multiple roles requirement - safely handle undefined user/role
    if (requiredRoles && (!user?.role || !requiredRoles.includes(user.role))) {
        return <Navigate to="/dashboard" replace/>;
    }

    return <>{children}</>;
};

// Convenience components for specific roles
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>{children}</ProtectedRoute>
);

export const OrganizerRoute: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <ProtectedRoute requiredRoles={[UserRole.ORGANIZER, UserRole.ADMIN]}>{children}</ProtectedRoute>
);

export const UserRoute: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <ProtectedRoute>{children}</ProtectedRoute>
);
