const LOGIN = "/";
const REGISTER = "/register";
const PROFILE = "/profile";
const DASHBOARD = "/dashboard";
const MAKE_EXAM = "/post/:id/make-exam";
const POST_ENROLLMENT = "/dashboard/post/:id/enrollments";
const VIEW_PROFILE = "/view-profile/:id";
const TAKE_EXAM = "/post/:id/exam/:enrollmentId/status/:status";

export const Pages = {
  LOGIN,
  REGISTER,
  PROFILE,
  DASHBOARD,
  MAKE_EXAM,
  POST_ENROLLMENT,
  VIEW_PROFILE,
  TAKE_EXAM,
};
