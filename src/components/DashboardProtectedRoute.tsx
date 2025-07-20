import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "@/state/hooks/useAuth";
import {toast} from "sonner";

interface DashboardProtectedRouteProps {
    children: React.ReactNode;
}

const DashboardProtectedRoute: React.FC<DashboardProtectedRouteProps> = ({children}) => {
    const {isAuthenticated, user, isAdmin, isOrganizer} = useAuth();

    // Check if the user is authenticated
    if (!isAuthenticated || !user) {
        toast.error("Please log in to access the dashboard");
        return <Navigate to="/auth/login" replace/>;
    }

    // Check if the email is verified
    if (!user.isEmailVerified) {
        toast.error("Please verify your email to access the dashboard");
        return <Navigate to="/auth/email-verification" state={{email: user.email}} replace/>;
    }

    // Check if the user has the required role (Admin or Organizer)
    if (!isAdmin() && !isOrganizer()) {
        toast.error("Access denied. Dashboard is only available for admins and event organizers.");
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

export default DashboardProtectedRoute;
