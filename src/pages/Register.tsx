import { Button, Checkbox, Form, Input, Select } from "antd";
import { useApi } from "../api/useApi";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";
import { Pages } from "../settings/Pages";
import setRules from "../utils/setRules";
import { INTERN } from "../constant/Constant";
import { REGISTER_API } from "../api/url/urls";
import { useWatch } from "antd/es/form/Form";
import { useNavigate } from "../utils/useNavigation";
import.meta.env.BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const options = [
    { value: "Intern", label: "Intern" },
    { value: "Company", label: "Company" },
  ];
  const { load, data, status } = useApi(
    `${import.meta.env.VITE_REACT_APP_API}${REGISTER_API}`,
    "POST"
  );

  const onFinish = (formData: any) => {
    load(formData);
    if (status === 0)
      Notification.openSuccessNotification("User registered successfully");
    navigate(Pages.ACTIVATE_PAGE, { username: formData.username });
    form.resetFields();
  };
  const role = useWatch("role", form);
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Form
          form={form}
          onFinish={onFinish}
          className="2xl:w-1/4 w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700"
        >
          <p className="text-blue-500 text-xl mb-1">Sign up</p>
          <Form.Item
            className="my-2 w-full"
            name="firstname"
            rules={setRules("Please enter firstname")}
          >
            <Input
              placeholder="Firstname"
              id="firstname"
              className="border-blue-500 rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="my-2"
            name="lastname"
            rules={setRules("Please enter lastname")}
          >
            <Input
              placeholder="Lastname"
              id="lastname"
              className="border-blue-500 rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="my-2"
            name="username"
            rules={setRules("Please enter username")}
          >
            <Input
              placeholder="Email"
              id="lastname"
              type="email"
              className="border-blue-500 rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="my-2"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input
              placeholder="Password"
              id="password"
              type="password"
              className="border-blue-500 rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="my-2 border border-blue-500 rounded-md"
            name="role"
            rules={setRules("Please select a role")}
          >
            <Select
              className="!border-blue-500 rounded-md"
              placeholder="Select a role"
              allowClear
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {role === INTERN && (
            <Form.Item
              className="my-2 w-full"
              name="university"
              rules={setRules("Please enter university")}
            >
              <Input
                placeholder="University"
                id="university"
                className="border-blue-500 rounded-md"
              />
            </Form.Item>
          )}

          <Form.Item
            className="my-2 w-full"
            name="address"
            rules={setRules("Please enter address")}
          >
            <Input
              placeholder="Address"
              id="address"
              className="border-blue-500 rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="my-1 flex gap-x-2"
            rules={setRules("Please check the terms")}
          >
            <Checkbox className="whitespace-wrap">
              I agree with terms to service
            </Checkbox>
          </Form.Item>
          <Form.Item className="mt-3">
            <Button htmlType="submit" className="bg-blue-500 w-full">
              Create account
            </Button>
          </Form.Item>
          <div className="flex gap-x-1">
            <p className="mt-1">Already member?</p>
            <Link
              to={"/"}
              className="text-blue-600 mt-1 underline cursor-pointer focus:text-blue-600"
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
