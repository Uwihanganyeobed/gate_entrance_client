import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import RegisterComputer from "./pages/RegisterComputer";
import VerifyComputer from "./pages/VerifyComputer";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: "users/register", element: <RegisterUser /> },
      { path: "computers/register", element: <RegisterComputer /> },
      { path: "computers/verify", element: <VerifyComputer /> },
    ],
  },
]);

export default router;
