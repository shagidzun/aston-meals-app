import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuth } from "../../features/user/userSlice";

interface ProtectedRouteProps {
	children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isAuth = useAppSelector(selectIsAuth);
	if (!isAuth) {
		return <Navigate to="/" replace />;
	}
	return children;
};
