import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuth, selectIsLoading } from "../../features/user/userSlice";

interface ProtectedRouteProps {
	children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	if (!isAuth && !isUserLoading) {
		return <Navigate to="/" replace />;
	}
	return children;
};
