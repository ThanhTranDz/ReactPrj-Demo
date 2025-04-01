import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
