import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./Pages";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Exam from "../pages/exam/Exam";
import Enrollments from "../pages/enrollment/Enrollments";
import TakeExam from "../pages/exam/TakeExam";
import { useSelector } from "react-redux";
import { Store } from "types/Store";
import NoData from "../components/Nodata";
const user = useSelector((state: Store) => state.user);

export const router = createBrowserRouter([
  {
    path: Pages.LOGIN,
    element: user ? <Login /> : <NoData />,
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
    path: Pages.VIEW_PROFILE,
    element: <Profile />,
  },
  {
    path: Pages.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: Pages.TAKE_EXAM,
    element: <TakeExam />,
  },
  {
    path: Pages.MAKE_EXAM,
    element: <Exam />,
  },
  {
    path: Pages.POST_ENROLLMENT,
    element: <Enrollments />,
  },
]);
