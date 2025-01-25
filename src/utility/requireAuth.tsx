import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


interface Props {
    children?: JSX.Element,
}

export const RequireAuth = ({children}: Props): JSX.Element| null => {
    const isAuthenticated = !!localStorage.getItem('user');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location }, replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    if (!isAuthenticated) {
        return null; // Don't render anything while redirecting
    }

    return children || null;
}

