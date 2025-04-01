import { Checkbox, PasswordInput, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must be at least 6 characters" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      dispatch(loginStart());
      
      // Hardcoded account for demo
      const validAccount = {
        email: "admin@example.com",
        password: "12345678"
      };

      if (values.email === validAccount.email && values.password === validAccount.password) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(loginSuccess({ email: values.email, id: "1" }));
        navigate("/lesson");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : "Login failed"));
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
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

            <div className="flex items-center justify-between">
              <Checkbox 
                label="Remember me" 
                {...form.getInputProps("rememberMe", { type: "checkbox" })}
              />
              <a
                className="text-sm font-medium text-blue-600 hover:underline"
                href="/forgot"
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              loading={loading}
            >
              Sign in
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <a
                className="font-medium text-blue-600 hover:underline"
                href="/sign-up"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
