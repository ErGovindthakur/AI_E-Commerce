import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import PrivateRoute from "./Private/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));

// Layout that includes Navbar
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);


const router = createBrowserRouter([
  // Public routes (no navbar)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // Protected routes (with navbar)
  {
    path: "/",
    element: <Layout />,   // Navbar here
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Home />
          </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
