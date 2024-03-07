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

onAuthStateChanged(auth, user => {
	if (user) {
		store.dispatch(getCurrentUser(user.email, user.uid));
	}
	store.dispatch(setLoadingOff());
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
		path: "/Search",
		element: <Search />
	},
	{
		path: "/signup",
		element: <SignUp />
	},
	{
		path: "/signin",
		element: <SignIn />
	},
	{
		path: "/history",
		element: (
			<ProtectedRoute>
				<History />
			</ProtectedRoute>
		)
	},
	{
		path: "/favorites",
		element: (
			<ProtectedRoute>
				<Favorites />
			</ProtectedRoute>
		)
	}
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
