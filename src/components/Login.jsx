import React, { useState } from "react";
import { supabase } from "../../supabase";
import { form } from "motion/react-client";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors("Please fill out all the fields");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.log(error);
        setError("Account doesn't exist ! ");
        setTimeout(() => {
          setError("");
        }, 2500);
        return;
      }
      setMessage("Logged in successfully , redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log("Error registering  : ", error);
      setError("Error registering");
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      style={{ backgroundImage: `url(/authbackground.svg)` }}
      className="min-h-screen flex items-center justify-center bg-center bg-cover "
    >
      <div className="relative p-8 rounded-lg shadow-md bg-secondary/20 backdrop-blur-3xl z-10">
        <span className="flex justify-center mb-4 rounded-full p-4 bg-green-800 w-fit mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        </span>
        <h2 className="text-2xl font-bold mb-6 text-center text-light">
          Log in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-light text-sm  mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-light text-sm  mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {message && (
            <p className="text-green-800  border border-green-500 bg-green-200 p-2 rounded-lg my-4 flex items-center space-x-2">
              <CheckCircle />
              <p>{message}</p>
            </p>
          )}
          {error && (
            <p className="text-red-800  bg-red-200 border border-red-500 p-2 rounded-lg my-4 flex items-center space-x-2">
              <AlertCircle />
              <p>{error}</p>
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            Register
          </button>
          <p className="my-4 text-center text-light">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="text-green-800 hover:text-green-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
