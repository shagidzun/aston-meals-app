import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Home } from "./pages/home/Home";
import { Category } from "./pages/category/Category";
import { Meal } from "./pages/meal/Meal";
import { Search } from "./pages/Search/Search";
import { SignUp } from "./pages/signup/SignUp";
import { SignIn } from "./pages/signin/SignIn";
import { History } from "./pages/history/History";
import { Favorites } from "./pages/favorites/Favorites";
import { auth } from "./firebase/firebase";
import { store } from "./app/store";
import { getCurrentUser, setLoadingOff } from "./features/user/userSlice";
import { ProtectedRoute } from "./components/protected-routes/ProtectedRoute";
import { ThemeProvider } from "./context/context";
import { ErrorBoundary } from "./pages/ErrorBoundary";

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
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
