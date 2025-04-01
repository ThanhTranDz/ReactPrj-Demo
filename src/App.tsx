import { Routes, Route, Navigate } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { DashBoardLayout } from "./layouts/DashBoardLayout";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";

import { AuthLayout } from "./layouts/AuthLayout";
import { LessonContent } from "./components/LessonContent";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {/* Redirect root path based on auth state */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/welcome" replace />
          ) : (
            <Navigate to="/sign-in" replace />
          )
        }
      />

      {/* Màn xác thực - chỉ cho phép khi chưa đăng nhập */}
      <Route element={<AuthLayout />}>
        <Route
          path="/sign-in"
          element={
            isAuthenticated ? <Navigate to="/welcome" replace /> : <Login />
          }
        />
        <Route
          path="/sign-up"
          element={
            isAuthenticated ? <Navigate to="/welcome" replace /> : <Register />
          }
        />
        <Route
          path="/forgot"
          element={
            isAuthenticated ? (
              <Navigate to="/welcome" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
      </Route>

      {/* Các route được bảo vệ - yêu cầu đăng nhập */}
      <Route element={<ProtectedRoute />}>
        {/* Màn welcome*/}
        <Route path="/welcome" element={<Welcome />} />

        {/* Màn sau khi đăng nhập */}
        <Route path="/lesson" element={<DashBoardLayout />}>
          <Route index element={<LessonContent />} />
          <Route path=":lessonId" element={<LessonContent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
