import { Button, Checkbox, Form, Input, Select } from "antd";
import { useApi } from "../api/useApi";
import { Link } from "react-router-dom";

const Register = () => {
  const options = [
    { value: "Intern", label: "Intern" },
    { value: "Company", label: "Company" },
  ];
  const { load, data } = useApi("http://127.0.0.1:8000/register/", "POST");

  const onFinish = (formData: any) => {
    load({ formData });
    // Send the form data to the server
    console.log(data.statusText);
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Form
          onFinish={onFinish}
          className="w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700"
        >
          <p className="text-green-800 text-xl mb-1">Sign up</p>
          <Form.Item className="my-2 w-full" name="firstname">
            <Input
              placeholder="Firstname"
              id="firstnmae"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="my-2" name="lastname">
            <Input
              placeholder="Lastname"
              id="lastname"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="my-2" name="email">
            <Input
              placeholder="Email"
              id="lastname"
              type="email"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="my-2" name="password">
            <Input
              placeholder="Password"
              id="password"
              type="password"
              className="border-green-500 rounded-md"
            />
          </Form.Item>
          <Form.Item className="my-2" name="role">
            <Select
              className="border-green-500 rounded-md"
              placeholder="Select a role"
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="my-1 flex gap-x-2"
            valuePropName="checked"
            rules={[{ required: true, message: "Please checked the terms" }]}
          >
            <Checkbox>I agree with terms to service</Checkbox>
          </Form.Item>
          <Form.Item className="mt-3">
            <Button htmlType="submit" className="bg-green-400 w-full">
              Create account
            </Button>
          </Form.Item>
          <div className="flex gap-x-1">
            <p className="mt-1">Already member?</p>
            <Link
              to={"/"}
              className="text-green-600 mt-1 underline cursor-pointer focus:text-green-600"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
