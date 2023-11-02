import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import MergePage from "./pages/Merge";

const Router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/merge_pdf",
        element: <MergePage />,
      },
    ],
  },
]);

export default Router;
