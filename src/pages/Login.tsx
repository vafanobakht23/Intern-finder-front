import { Button, Input, Form } from "antd";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (formData: any) => {
    // Send the form data to the server
    console.log(JSON.stringify(formData));
  };
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Form
          onFinish={onFinish}
          className="2xl:w-1/4 w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700"
        >
          <p className="text-green-800 text-xl mb-1">Sign in</p>
          <Form.Item className="my-2" name="email">
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
