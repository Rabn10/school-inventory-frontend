// src/components/PrivateRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
