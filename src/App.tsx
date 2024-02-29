import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Category } from "./pages/category/Category";
import { Meal } from "./pages/meal/Meal";
import { Search } from "./pages/Search/Search";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "category/:category",
		element: <Category />
	},
	{
		path: "meal/:id",
		element: <Meal />
	},
	{
		path: "search",
		element: <Search />
	}
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
