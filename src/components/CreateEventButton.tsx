import React from "react";
import {useNavigate} from "react-router-dom";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "sonner";
import {handleCreateEventClick} from "@/components/checkOnboardingStatus.tsx";

interface CreateEventButtonProps {
    variant?: "default" | "outline" | "secondary";
    size?: "default" | "sm" | "lg";
    className?: string;
    children?: React.ReactNode;
}

export const CreateEventButton: React.FC<CreateEventButtonProps> = ({
                                                                        variant = "default",
                                                                        size = "default",
                                                                        className = "",
                                                                        children = "Create Event"
                                                                    }) => {
    const navigate = useNavigate();
    const {user} = useAuth();

    const handleClick = () => {
        const result = handleCreateEventClick(user, navigate);

        // Show appropriate toast messages
        switch (result.reason) {
            case "token_expired":
                toast.error("Your session has expired. Please log in again.");
                break;
            case "not_onboarded":
                toast.info("Please complete your organizer onboarding first.");
                break;
            case "verification_pending":
                toast.info("Your verification is still pending. Please wait for approval.");
                break;
            case "approved":
                // No toast needed for successful navigation
                break;
        }
    };

    return (
        <Button
            onClick={handleClick}
            variant={variant}
            size={size}
            className={className}
        >
            <Plus className="h-4 w-4 mr-2"/>
            {children}
        </Button>
    );
};