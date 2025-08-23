import React, { useContext, useState } from "react";
import google from "../assets/google.jpeg";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
const Login = () => {
  const [show, setShow] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { serverUrl } = useContext(authDataContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/login`,
        loginForm,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      setLoginForm({
        email: "",
        password: "",
      });

      toast.success(res.data.message);

      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const navigate = useNavigate();

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

   const googleLogin = async() => {
    try {
      const res = await signInWithPopup(auth,provider);
      let user = res.user;
      let name = user.displayName;
      let email = user.email;

      let googleData = await axios.post(`${serverUrl}/api/v1/auth/googleLogin`,{
        name,email
      },{withCredentials:true})
      console.log(googleData)
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-gray-200 to-gray-100">
      {/* Card Container */}
      <div className="w-[360px] bg-white rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Login Now
        </h3>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md shadow-sm transition"
        onClick={googleLogin}>
          <img src={google} alt="google" className="w-5 h-5" />
          <span className="text-sm font-medium">Login with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
            placeholder="Email*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"
          />
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={handleShow}
            >
              {!show ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 hover:underline font-medium cursor-pointer"
          >
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
