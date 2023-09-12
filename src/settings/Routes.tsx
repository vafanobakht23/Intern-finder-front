import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./Pages";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import { useSelector } from "react-redux";

export const router = createBrowserRouter([
  {
    path: Pages.LOGIN,
    element: <Login />,
  },
  {
    path: Pages.REGISTER,
    element: <Register />,
  },
  {
    path: Pages.PROFILE,
    element: <Profile />,
  },
  {
    path: Pages.DASHBOARD,
    element: <Dashboard />,
  },
]);
