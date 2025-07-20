export interface User {
    id: string;
    email: string;
    isOnboarded: boolean;
    verificationStatus: "pending" | "approved" | "rejected";
    tokenExpiry: number;
}

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

    // Check if the token is expired
    if (user.tokenExpiry && Date.now() > user.tokenExpiry) {
        return {
            canCreateEvent: false,
            redirectPath: "/auth/login",
            reason: "token_expired"
        };
    }

    // Check if a user has completed onboarding
    if (!user.isOnboarded) {
        return {
            canCreateEvent: false,
            redirectPath: "/auth/onboarding",
            reason: "not_onboarded"
        };
    }

    // Check verification status
    if (user.verificationStatus === "pending") {
        return {
            canCreateEvent: false,
            redirectPath: "/auth/verification-pending",
            reason: "verification_pending"
        };
    }

    if (user.verificationStatus === "rejected") {
        return {
            canCreateEvent: false,
            redirectPath: "/auth/onboarding",
            reason: "not_onboarded"
        };
    }

    // User is fully verified and can create events
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