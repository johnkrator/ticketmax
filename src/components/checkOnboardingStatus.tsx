import type {User} from "@/state/api/types/api.ts";


export interface OnboardingCheckResult {
    canCreateEvent: boolean;
    redirectPath: string;
    reason: "token_expired" | "not_onboarded" | "verification_pending" | "approved";
}

export const checkOnboardingStatus = (user: User | null): OnboardingCheckResult => {
    // Check if a user is logged in
    if (!user) {
        return {
            canCreateEvent: false,
            redirectPath: "/auth/login",
            reason: "token_expired"
        };
    }

    // For now, assume all logged-in users can create events
    // You can add additional checks here based on user role or verification status
    return {
        canCreateEvent: true,
        redirectPath: "/events/create",
        reason: "approved"
    };
};

export const handleCreateEventClick = (user: User | null, navigate: (path: string) => void) => {
    const result = checkOnboardingStatus(user);
    navigate(result.redirectPath);
    return result;
};