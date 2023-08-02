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
    <div className="w-full h-full bg-red-800">
      <div className="flex flex-co bg-red-900">
        <p>Sign up</p>
        <div className="flex flex-col items-center justify-center h-screen gap-y-3 my-2">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(): void => console.log("vafa")}
          >
            <Form>
              <div>
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Please enter the firstname"
                />
              </div>
              <div>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Please enter the lastname"
                />
              </div>
              <div>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Please enter the email"
                />
              </div>
              <div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter the password"
                />
              </div>
              <div>
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
                {" "}
                <div>
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
