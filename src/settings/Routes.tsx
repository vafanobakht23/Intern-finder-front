import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./Pages";

export const router = createBrowserRouter([
  {
    path: Pages.LOGIN,
    element: <Login />,
  },
  {
    path: Pages.REGISTER,
    element: <Register />,
  },
]);
