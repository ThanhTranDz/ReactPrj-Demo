import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SideBar = () => {
  const location = useLocation();

  const isActive = (lessonId: string) => {
    return location.pathname === `/lesson/${lessonId}`;
  };

  return (
    <aside className="h-full px-3 py-4 overflow-y-auto bg-gray-50 row-start-2 w-[10rem]">
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
              isActive("1") ? "bg-green-400" : ""
            }`}
            to={`/lesson/1`}
          >
            <span className="ml-3">Lesson 1</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
              isActive("2") ? "bg-green-400" : ""
            }`}
            to={`/lesson/2`}
          >
            <span className="ml-3">Lesson 2</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
              isActive("3") ? "bg-green-400" : ""
            }`}
            to={`/lesson/3`}
          >
            <span className="ml-3">Lesson 3</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
              isActive("4") ? "bg-green-400" : ""
            }`}
            to={`/lesson/4`}
          >
            <span className="ml-3">Lesson 4</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  ${
              isActive("5") ? "bg-green-400" : ""
            }`}
            to={`/lesson/5`}
          >
            <span className="ml-3">Lesson 5</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  ${
              isActive("6") ? "bg-green-400" : ""
            }`}
            to={`/lesson/6`}
          >
            <span className="ml-3">Lesson 6</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  ${
              isActive("7") ? "bg-green-400" : ""
            }`}
            to={`/lesson/7`}
          >
            <span className="ml-3">Lesson 7</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  ${
              isActive("8") ? "bg-green-400" : ""
            }`}
            to={`/lesson/8`}
          >
            <span className="ml-3">Lesson 8</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
