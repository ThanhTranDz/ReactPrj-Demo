// import React, { useState } from "react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const lessons = {
  0: lazy(() => import("./lessons/AllLesson")),
  1: lazy(() => import("./lessons/Lesson1")),
  2: lazy(() => import("./lessons/Lesson2")),
  3: lazy(() => import("./lessons/Lesson3")),
  4: lazy(() => import("./lessons/Lesson4")),
  5: lazy(() => import("./lessons/Lesson5")),
  6: lazy(() => import("./lessons/Lesson6")),
  7: lazy(() => import("./lessons/Lesson7")),
  8: lazy(() => import("./lessons/Lesson8")),
};

export const LessonContent = () => {
  // const lesson, setLesson = useState("");
  const { lessonId } = useParams();
  console.log(lessonId);
  
  const defaultLesson = "0"; // Đặt bài học mặc định ở đây
  const lessonToShow = lessonId || defaultLesson;
 // Nếu chưa có lessonId, dùng bài học mặc định
  const LessonComponent = lessons[lessonToShow];

  if (!LessonComponent) {
    // return <h1>Không tìm thấy bài học {lessonToShow}</h1>;
  }

  return (
    <Suspense>
      <div className="p-8 w-full border-l border-t border-[#e5e7eb]">
        <LessonComponent />
      </div>
    </Suspense>
  );
};
