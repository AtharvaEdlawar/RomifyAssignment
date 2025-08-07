import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../auth/Stores/AuthAtom';

const SmartRedirect: React.FC = () => {
    const auth = useRecoilValue(loginState);
    
    // Redirect to task list if logged in, otherwise to login
    return <Navigate to={auth.logged ? "/task" : "/login"} replace />;
};

export default SmartRedirect;