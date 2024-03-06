import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuth } from "../../features/user/userSlice";

interface ProtectedRouteProps {
	children: ReactNode;
	isUserPage: boolean;
}
export const ProtectedRoute = ({
	children,
	isUserPage
}: ProtectedRouteProps) => {
	const isAuth = useAppSelector(selectIsAuth);
	if (!isAuth && isUserPage) {
		return <Navigate to="/" replace />;
	}
	return children;
};
