import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className="border-b border-[#e5e7eb] header flex justify-between items-center px-4 sticky top-0 z-50 bg-white col-span-5 h-[40px]">
      <div>
        <a
          aria-current="page"
          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          href="/lesson"
        >
          <span className="ml-3">All lesson</span>
        </a>
      </div>
      <b>Bài thực hành react ( ts required )</b>
      <button
        onClick={handleLogout}
        className="bg-blue-400 text-white text-sm px-1 rounded py-1 h-fit hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};
