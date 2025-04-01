import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
// import { LessonContent } from "../components/LessonContent";
import { SideBar } from "../components/SideBar";

export const DashBoardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};
