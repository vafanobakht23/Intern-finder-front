import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Sign up</p>
        <div className="flex flex-col my-2">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(): void => console.log("vafa")}
          >
            <Form>
              <div className="my-2">
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Please enter the firstname"
                />
              </div>
              <div className="my-2">
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Please enter the lastname"
                />
              </div>
              <div className="my-2">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Please enter the email"
                />
              </div>
              <div className="my-2">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter the password"
                />
              </div>
              <div className="my-2">
                <Field as="select" id="selectOption" name="selectOption">
                  <option value="">Select a role</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <div className="my-1">
                  <label htmlFor="isChecked">
                    <Field type="checkbox" id="isChecked" name="isChecked" />I
                    agree to the terms of service
                  </label>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
