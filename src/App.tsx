import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Home } from "./pages/home/Home";
import { Category } from "./pages/category/Category";
import { Meal } from "./pages/meal/Meal";
import { SignUp } from "./pages/signup/SignUp";
import { SignIn } from "./pages/signin/SignIn";
import { History } from "./pages/history/History";
import { Favorites } from "./pages/favorites/Favorites";
import { auth } from "./firebase/firebase";
import { store } from "./app/store";
import { getCurrentUser } from "./features/user/userSlice";
import { ProtectedRoute } from "./components/protectedRoutes/ProtectedRoute";
import { Search } from "./pages/search/Search";

onAuthStateChanged(auth, user => {
	if (user) {
		store.dispatch(getCurrentUser(user.email, user.uid));
	}
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/category/:category",
		element: <Category />
	},
	{
		path: "/meal/:id",
		element: <Meal />
	},
	{
		path: "/search",
		element: <Search />
	},
	{
		path: "/signup",
		element: (
			<ProtectedRoute isUserPage={false}>
				<SignUp />
			</ProtectedRoute>
		)
	},
	{
		path: "/signin",
		element: (
			<ProtectedRoute isUserPage={false}>
				<SignIn />
			</ProtectedRoute>
		)
	},
	{
		path: "/history",
		element: (
			<ProtectedRoute isUserPage={true}>
				<History />
			</ProtectedRoute>
		)
	},
	{
		path: "/favorites",
		element: (
			<ProtectedRoute isUserPage={true}>
				<Favorites />
			</ProtectedRoute>
		)
	}
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
