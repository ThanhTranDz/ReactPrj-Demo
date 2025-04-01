import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const ForgotPassword = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Reset password
          </h1>

          <div className="space-y-4 md:space-y-6">
            <TextInput
              label="Your email"
              placeholder="name@company.com"
              classNames={{
                label: "mb-2",
              }}
            />

            <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Reset password
            </button>

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
