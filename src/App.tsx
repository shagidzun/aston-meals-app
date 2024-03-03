import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Category } from "./pages/category/Category";
import { Meal } from "./pages/meal/Meal";
import { Search } from "./pages/Search/Search";
import { SignUp } from "./pages/signup/SignUp";
import { SignIn } from "./pages/signin/SignIn";
import { History } from "./pages/history/History";

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
		element: <SignUp />
	},
	{
		path: "/signin",
		element: <SignIn />
	},
	{
		path: "/history",
		element: <History />
	}
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
