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
    <div>
      <div className="flex flex-col">
        <p>Sign up</p>
        <div className="flex flex-col items-center justify-center h-screen gap-y-3 my-2">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(): void => console.log("vafa")}
          >
            <Form className="my-2">
              <div>
                <Field
                  type="text"
                  className="w-full my-3"
                  id="firstname"
                  name="firstname"
                  placeholder="Please enter the firstname"
                />
              </div>
              <div>
                <Field
                  type="text"
                  className="w-full"
                  id="lastname"
                  name="lastname"
                  placeholder="Please enter the lastname"
                />
              </div>
              <div>
                <Field
                  type="text"
                  className="w-full"
                  id="email"
                  name="email"
                  placeholder="Please enter the email"
                />
              </div>
              <div>
                <Field
                  type="password"
                  className="w-full"
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
