import { Button, Checkbox, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const options = [
    { value: "Intern", label: "Intern" },
    { value: "Company", label: "Company" },
  ];
  const onFinish = async (formData: any) => {
    // Send the form data to the server
    const response = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(formData), // body data type must match "Content-Type" header
    })
      .then((response) => {
        // @ts-ignore
        console.log(response.data); // Response from the Django API
        // Handle the response as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle errors if any
      });
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
