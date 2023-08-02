import { Button, Checkbox, Input, Select } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const options = [
    { value: "Intern", label: "Intern" },
    { value: "Company", label: "Company" },
  ];

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen border-green-700 rounded-2xl">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            agree: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(): void => console.log("vafa")}
        >
          <Form className="w-1/3 mx-auto p-8 shadow-xl rounded-md border-l-green-700">
            <p className="text-green-800 text-xl mb-1">Sign up</p>
            <div className="my-2 w-full">
              <Input
                placeholder="Please enter the firstname"
                name="firstname"
                id="firstnmae"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="my-2">
              <Input
                placeholder="Please enter the lastname"
                name="lastname"
                id="lastname"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="my-2">
              <Input
                placeholder="Please enter the email"
                name="lastname"
                id="lastname"
                type="email"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="my-2">
              <Input
                placeholder="Please enter the password"
                name="password"
                id="password"
                type="password"
                className="border-green-500 rounded-md"
              ></Input>
            </div>
            <div className="my-2 w-full flex">
              <Select className="w-max flex border-green-500 rounded-md">
                <option value="">Select a role</option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="w-full"
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="my-1 flex gap-x-2">
              <Checkbox />
              <span>I agree with terms to service</span>
            </div>
            <div className="mt-3">
              <Button className="bg-green-400 w-full">Create account</Button>
            </div>
            <div className="flex gap-x-1">
              <p className="mt-1">Already member?</p>
              <a className="text-green-600 mt-1 underline cursor-pointer focus:text-green-600">
                Sign in
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
