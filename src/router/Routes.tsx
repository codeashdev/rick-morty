import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/character/:id", element: <App /> },
]);

const AllRoutes = () => {
	return <RouterProvider router={router} />;
};

export default AllRoutes;
