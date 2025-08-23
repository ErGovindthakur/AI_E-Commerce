import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from './pages/Home'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// const Login = lazy(()=>import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h2>Data is Loading..</h2>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
