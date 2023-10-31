import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export default Router;
