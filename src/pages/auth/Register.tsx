import { PasswordInput, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must be at least 6 characters" : null),
      confirmPassword: (value, values) => 
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // Here you would typically make an API call to your backend for registration
      // For demo purposes, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // After successful registration, automatically log the user in
      dispatch(loginSuccess({ email: values.email, id: "1" }));
      navigate("/lesson");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign up
          </h1>

          <div className="space-y-4 md:space-y-6">
            <TextInput
              label="Your email"
              placeholder="name@company.com"
              classNames={{
                label: "mb-2",
              }}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              classNames={{
                label: "mb-2",
              }}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Rewrite Password"
              placeholder="••••••••"
              classNames={{
                label: "mb-2",
              }}
              {...form.getInputProps("confirmPassword")}
            />

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              loading={loading}
            >
              Sign up
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              You have an account yet?{" "}
              <a
                className="font-medium text-blue-600 hover:underline"
                href="/sign-in"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
