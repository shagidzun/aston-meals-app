import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
	user: boolean;
	children: ReactNode;
}
export const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
	if (!user) {
		return <Navigate to="/" replace />;
	}
	return children;
};
