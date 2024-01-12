import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./Pages";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Exam from "../pages/exam/Exam";
import Enrollments from "../pages/enrollment/Enrollments";
import TakeExam from "../pages/exam/TakeExam";
import Activate from "../pages/actviate/Activate";
import NoData from "../components/Nodata";

export const router = createBrowserRouter([
  {
    path: Pages.LOGIN,
    element: <Login />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.REGISTER,
    element: <Register />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.PROFILE,
    element: <Profile />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.ACTIVATE_PAGE,
    element: <Activate />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.VIEW_PROFILE,
    element: <Profile />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.DASHBOARD,
    element: <Dashboard />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.TAKE_EXAM,
    element: <TakeExam />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.MAKE_EXAM,
    element: <Exam />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
  {
    path: Pages.POST_ENROLLMENT,
    element: <Enrollments />,
    errorElement: <NoData text="Not found!" size="88" />,
  },
]);
