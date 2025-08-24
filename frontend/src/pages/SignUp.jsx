import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import google from "../assets/google.jpeg";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { userDataContext } from "../context/UserContext";

const SignUp = () => {
  const [show, setShow] = useState();
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/register`,
        signUpForm,
        {
          withCredentials: true,
        }
      );

      toast.success(res?.data?.message);
      setSignUpForm({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      console.log(err.message);
    }
  };

  const navigate = useNavigate();

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const googleSignUp = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      let user = res.user;
      let name = user.displayName;
      let email = user.email;

      let googleData = await axios.post(
        `${serverUrl}/api/v1/auth/googleLogin`,
        {
          name,
          email,
        },
        { withCredentials: true }
      );

      toast.success(
        googleData?.data?.message || "Google verification Successfully..."
      );
      await getCurrentUser();
      navigate("/");
      console.log(googleData);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-gray-200 to-gray-100">
      {/* Card Container */}
      <div className="w-[360px] bg-white rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Create New Account
        </h3>

        {/* Google Signup */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md shadow-sm transition"
          onClick={googleSignUp}
        >
          <img src={google} alt="google" className="w-5 h-5" />
          <span className="text-sm font-medium">Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            name="name"
            value={signUpForm.name}
            onChange={handleSignUpChange}
            placeholder="Name*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"
          />
          <input
            type="email"
            name="email"
            value={signUpForm.email}
            onChange={handleSignUpChange}
            placeholder="Email*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-sm"
          />
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
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

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:underline font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
