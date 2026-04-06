import React from 'react';
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactElement;
    user: any;
};

export const PrivateRoute = ({ children, user }: PrivateRouteProps) => {
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};