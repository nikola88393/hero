import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Spinner } from "@heroui/react";

import { useAuth } from "../contexts/auth-context";

// Layouts
const AuthLayout = React.lazy(() => import("../layouts/auth-layout"));
const DashboardLayout = React.lazy(() => import("../layouts/dashboard-layout"));

// Auth Pages
const Login = React.lazy(() => import("../pages/auth/login"));
const Register = React.lazy(() => import("../pages/auth/register"));

// Dashboard Pages
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Departments = React.lazy(() => import("../pages/departments"));
const Faculties = React.lazy(() => import("../pages/faculties"));
const Instructors = React.lazy(() => import("../pages/instructors"));
const Students = React.lazy(() => import("../pages/students"));
const Courses = React.lazy(() => import("../pages/courses"));
const Curriculum = React.lazy(() => import("../pages/curriculum"));
const Grades = React.lazy(() => import("../pages/grades"));
const Statistics = React.lazy(() => import("../pages/statistics"));
const Profile = React.lazy(() => import("../pages/profile"));
const UserManagement = React.lazy(() => import("../pages/user-management"));
const CollegeInfo = React.lazy(() => import("../pages/college-info"));

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <Spinner size="lg" color="primary" />
  </div>
);

// ProtectedRoute wrapper
const ProtectedRoute = ({
  allowedRoles = [],
  children,
}: {
  allowedRoles?: string[];
  children: React.ReactNode;
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <LoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role as string)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

// Main Routes
export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <Register />
              </AuthLayout>
            )
          }
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={["administrator", "rector"]}>
              <DashboardLayout>
                <Departments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculties"
          element={
            <ProtectedRoute allowedRoles={["administrator", "rector"]}>
              <DashboardLayout>
                <Faculties />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructors"
          element={
            <ProtectedRoute
              allowedRoles={["administrator", "rector", "department_head"]}
            >
              <DashboardLayout>
                <Instructors />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute
              allowedRoles={[
                "administrator",
                "rector",
                "department_head",
                "instructor",
              ]}
            >
              <DashboardLayout>
                <Students />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute
              allowedRoles={["administrator", "rector", "department_head"]}
            >
              <DashboardLayout>
                <Courses />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/curriculum"
          element={
            <ProtectedRoute
              allowedRoles={["administrator", "rector", "department_head"]}
            >
              <DashboardLayout>
                <Curriculum />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/grades"
          element={
            <ProtectedRoute allowedRoles={["instructor", "student"]}>
              <DashboardLayout>
                <Grades />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/statistics"
          element={
            <ProtectedRoute allowedRoles={["administrator", "rector"]}>
              <DashboardLayout>
                <Statistics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["administrator"]}>
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/college"
          element={
            <ProtectedRoute allowedRoles={["administrator", "rector"]}>
              <DashboardLayout>
                <CollegeInfo />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Default & Catch-All Routes */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Suspense>
  );
};
