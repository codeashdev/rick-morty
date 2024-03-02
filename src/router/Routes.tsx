import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Character from "../pages/Character/Character";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/character/:id", element: <Character /> },
]);

const AllRoutes = () => {
	return <RouterProvider router={router} />;
};

export default AllRoutes;
