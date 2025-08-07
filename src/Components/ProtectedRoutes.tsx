// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../auth/Stores/AuthAtom';

const ProtectedRoute: React.FC = () => {
    const auth = useRecoilValue(loginState);

    if (!auth.logged) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
