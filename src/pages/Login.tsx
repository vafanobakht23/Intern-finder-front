import { Button, Checkbox, Input, Select } from "antd";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(): void => console.log("vafa")}
        >
          <Form className="w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700">
            <p className="text-green-800 text-xl mb-1">Sign in</p>
            <div className="my-2">
              <Input
                placeholder="Email"
                name="email"
                id="email"
                type="email"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="my-2">
              <Input
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="mt-3">
              <Button className="bg-green-400 w-full">Login</Button>
            </div>
            <div className="flex gap-x-1 mt-2">
              <p className="mt-1">Don't have an account?</p>
              <Link
                to="/register"
                className="text-green-600 mt-1 underline cursor-pointer focus:text-green-600"
              >
                Sign up
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Login;
