import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { auth } from "./firebase/firebase";
import { store } from "./app/store";
import { getCurrentUser, setLoadingOff } from "./features/user/userSlice";
import { ProtectedRoute } from "./components/protected-routes/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeProvider";

const Home = lazy(() => import("./pages/home/Home"));
const Category = lazy(() => import("./pages/category/Category"));
const Meal = lazy(() => import("./pages/meal/Meal"));
const Search = lazy(() => import("./pages/Search/Search"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const SignIn = lazy(() => import("./pages/signin/SignIn"));
const History = lazy(() => import("./pages/history/History"));
const Favorites = lazy(() => import("./pages/favorites/Favorites"));
const ErrorBoundary = lazy(
	() => import("./pages/error-boundary/ErrorBoundary")
);

onAuthStateChanged(auth, user => {
	if (user) {
		//здесь используется store, т.к. в верхнем уровне хуки использовать недопустимо
		store.dispatch(getCurrentUser(user.email, user.uid));
	}
	store.dispatch(setLoadingOff());
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/category/:category",
		element: <Category />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/meal/:id",
		element: <Meal />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/Search",
		element: <Search />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/signup",
		element: <SignUp />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/signin",
		element: <SignIn />,
		errorElement: <ErrorBoundary />
	},
	{
		path: "/history",
		element: (
			<ProtectedRoute>
				<History />
			</ProtectedRoute>
		),
		errorElement: <ErrorBoundary />
	},
	{
		path: "/favorites",
		element: (
			<ProtectedRoute>
				<Favorites />
			</ProtectedRoute>
		),
		errorElement: <ErrorBoundary />
	}
]);
const App = () => {
	return (
		<ThemeProvider>
			<Suspense fallback={<LinearProgress />}>
				<RouterProvider router={router} />
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
