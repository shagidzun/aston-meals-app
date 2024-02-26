import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Category } from "./pages/category/Category";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "category/:category",
		element: <Category />
	}
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
