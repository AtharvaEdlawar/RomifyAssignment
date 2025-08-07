import { useRecoilState } from 'recoil';
import { loginState } from './AuthAtom';
import type { LoginType, SignupHookResult } from './Types';
import { useAdminAppService } from '../../Utils/Axios';
import { toast } from 'react-toastify';
interface LoginResult {
    success: boolean;
    data?: LoginType;
    message?: string;
}
export const useAuthHook = () => {
    const [loginData, setLoginData] = useRecoilState(loginState);
    const adminAppService = useAdminAppService();

const loginHook = async (email: string, password: string): Promise<LoginResult> => {
    try {
        const response: any = await adminAppService.post(`/task/login`, {
            email,
            password
        });

        const responseData = response.data || response;
        
            const { id, token, user_name, email: userEmail } = responseData;
                            
            const userData: LoginType = {
                logged: true,
                token,
                message: responseData.message, // Use responseData consistently
                userData: {
                     id,
                     user_name,
                    email: userEmail
                }
            };
            setLoginData(userData);
            toast.success('Login successful!');
            return { success: true, data: userData };        
    } catch (error: unknown) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed';

        if (typeof error === 'object' && error !== null) {
            const apiError = error as any;
                            
            // ✅ Check axios error response structure
            if (apiError.response?.data?.error) {
                errorMessage = apiError.response.data.error;
            } else if (apiError.response?.data?.message) {
                errorMessage = apiError.response.data.message;
            } else if (apiError.message) {
                errorMessage = apiError.message;
            } else if (apiError.error) {
                errorMessage = apiError.error;
            }
        }

        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
};

 
const signupHook = async (
    email: string,
    password: string, 
    firstName: string,
    lastName: string
): Promise<SignupHookResult> => {
    try {
        const response = await adminAppService.post(`/task/login/signup`, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword: password
        });

        const data = response.data || response;
        
        if (data.success) {
            return { 
                success: true, 
                message: data.message,
                data: {
                    id: data.id,
                    user_name: data.user_name,
                    email: data.email,
                    token: data.token
                }
            };
        }

        return { success: false, message: data.message || 'Signup failed' };

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
        return { success: false, message: errorMessage };
    }
};

    return {
        loginHook,
        signupHook,
        loginData
    };
};