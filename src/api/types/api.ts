export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export const UserRole = {
    USER: "USER",
    ORGANIZER: "ORGANIZER",
    ADMIN: "ADMIN"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// DTOs for API requests
export interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

export interface ResetPasswordDto {
    token: string;
    newPassword: string;
}

// API Response interfaces
export interface AuthResponse {
    user: User;
    access_token: string;
    message: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ApiError {
    message: string | string[];
    statusCode: number;
    error?: string;
}
