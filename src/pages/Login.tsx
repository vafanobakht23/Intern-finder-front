import { Button, Input, Form } from "antd";
import { useApi } from "../api/useApi";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const { load, data } = useApi("http://127.0.0.1:8000/login/login/", "POST");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (formData: any) => {
    await load(formData);
    data ? navigate("/profile") : navigate("/");
  };
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Form
          onFinish={onFinish}
          className="2xl:w-1/4 w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700"
        >
          <p className="text-green-800 text-xl mb-1">Sign in</p>
          <Form.Item className="my-2" name="username">
            <Input
              placeholder="Email"
              id="email"
              type="email"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="my-2" name="password">
            <Input
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="mt-3" name="password">
            <Button className="bg-green-400 w-full" htmlType="submit">
              Login
            </Button>
          </Form.Item>
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
      </div>
    </div>
  );
};
export default Login;
