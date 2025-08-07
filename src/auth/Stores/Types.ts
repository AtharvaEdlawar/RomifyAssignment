export interface LoginType {
    logged: boolean;
    token: string;
    message: string;
    userData: {
        id: number;
        user_name: string;
        email?: string;
    };
}

export interface SignupHookResult {
    success: boolean;
    message: string;
    data?: {
        id?: number;
        user_name?: string;
        token?: string;
        email?: string;
    };
}

export interface SignupResponse {
    message: string;
    success?: boolean;
    id?: number;
    user_name?: string;
    email?: string;
    token?: string
    firstName?: string;
    lastName?: string;
}

export type LoginResponse = {
    message: string;
    id: number;
    token: string;
    user_name: string;
    email: string;
    error?: string;
};

export type LoginHookResult = {
    success: boolean;
    data?: LoginType;
    message?: string;
};