import { useForm, zodResolver } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Calendar } from "lucide-react";
import { z } from "zod";

const now = new Date();

const schema = z.object({
  username: z
    .string()

    .min(
      8,
      "Tối thiểu 8 kỹ tự, không được bao gồm chữ viết hoa, số và ký tự đặc biệt."
    )
    .regex(
      /^[a-z]+$/,
      "Tối thiểu 8 kỹ tự, không được bao gồm chữ viết hoa, số và ký tự đặc biệt."
    )
    .nonempty("Username is required."),

  password: z
    .string()

    .min(8, "min length is 8.")
    .regex(
      /[A-Z]/,
      "Password phải bao gồm một chữ thường, một chữ viết hoa, một ký tự đặc biệt và một số."
    )
    .regex(
      /\d/,
      "Password phải bao gồm một chữ thường, một chữ viết hoa, một ký tự đặc biệt và một số."
    )
    .regex(
      /[^A-Za-z0-9]/,
      "Password phải bao gồm một chữ thường, một chữ viết hoa, một ký tự đặc biệt và một số."
    )
    .nonempty("Password is required."),

  confirmPassword: z.string().min(8, "min length is 8.").nonempty("required."),

  email: z
    .string()

    .email("Entered value does not match email format.")
    .nonempty("Email is required."),

  phoneNumber: z
    .string()

    .regex(/^0\d{9,}$/, "ít nhất 10 ký tự.")
    .nonempty("Phone is required."),

  website: z
    .string()
    .url("Địa chỉ website không hợp lệ.")
    .nonempty("website is required."),

  dateOfBirth: z
    .date()
    .nullable()
    .refine((date) => {
      if (date === null) return false;
      return date.getFullYear() >= 1980 && date.getFullYear() <= 2020;
    }, "Năm sinh phải từ 1980 đến 2020")
    .refine((date) => date !== null, "Năm sinh không được để trống"),

  firstName: z.string().min(1, "firstName is required."),
  lastName: z.string().min(1, "lastName is required."),

  linkedIn: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https:\/\/(www\.)?linkedin\.com\/.*$/.test(val),
      "Cần nhập chính xác link linkedIn."
    ),
  facebook: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https:\/\/(www\.)?facebook\.com\/.*$/,
      "Cần nhập chính xác link facebook."
    ),

  activeRange: z
    .array(z.date().nullable())
    .length(2, "Vui lòng chọn ngày hợp lệ")
    .refine(
      (value) => {
        const [startDate, endDate] = value;
        return startDate !== null && endDate !== null;
      },
      { message: "Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc" }
    )
    .refine(
      (value) => {
        const [startDate] = value;
        return startDate && startDate >= now;
      },
      { message: "Ngày bắt đầu không được nhỏ hơn hôm nay" }
    )
    .refine(
      (value) => {
        const [startDate, endDate] = value;
        return startDate && endDate && endDate >= startDate;
      },
      { message: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu" }
    )
    .refine(
      (value) => {
        const [startDate, endDate] = value;
        return startDate !== null && endDate !== null;
      },
      { message: "Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc" }
    ),
});

export const BlurForm = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      website: "",
      dateOfBirth: null,
      firstName: "",
      lastName: "",
      linkedIn: "",
      facebook: "",
      activeRange: [null, null] as [Date | null, Date | null],
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  return (
    <div className="mb-24 overflow-auto ">
      <h1 className="my-6 text-lg font-bold">
        Thực hành validate form - onBlur
      </h1>
      <form
        onSubmit={form.onSubmit((values) => {
          alert("Form submitted successfully!");
          console.log(values);
        })}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <TextInput
            label="Username"
            {...form.getInputProps("username")}
            placeholder="Username"
            classNames={{
              label: "mb-2",
            }}
          />

          <PasswordInput
            label="Password"
            {...form.getInputProps("password")}
            placeholder="Password"
            classNames={{
              label: "mb-2",
            }}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="Email address"
            {...form.getInputProps("email")}
            placeholder="Email address"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="PhoneNumber address"
            {...form.getInputProps("phoneNumber")}
            placeholder="PhoneNumber address"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="website"
            {...form.getInputProps("website")}
            placeholder="website"
            classNames={{
              label: "mb-2",
            }}
          />

          <DatePickerInput
            rightSection={<Calendar size={16} />}
            label="Date of Birth"
            {...form.getInputProps("dateOfBirth")}
            placeholder="Select date"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="firstName"
            {...form.getInputProps("firstName")}
            placeholder="firstName"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="lastName"
            {...form.getInputProps("lastName")}
            placeholder="lastName"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="linkedIn"
            {...form.getInputProps("linkedIn")}
            placeholder="linkedIn"
            classNames={{
              label: "mb-2",
            }}
          />

          <TextInput
            label="facebook"
            {...form.getInputProps("facebook")}
            placeholder="facebook"
            classNames={{
              label: "mb-2",
            }}
          />

          <DatePickerInput
            rightSection={<Calendar size={16} />}
            label="Active range"
            value={form.getInputProps("activeRange").value}
            {...form.getInputProps("activeRange")}
            type="range"
            placeholder="Pick date range"
            classNames={{
              label: "mb-2",
            }}
          />
        </div>
        <button
          disabled={!form.isValid()}
          className={`mt-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            form.isValid()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
