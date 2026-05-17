import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const setAuth =
    useAuthStore(
      (state) =>
        state.setAuth
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      setAuth(
        res.data.user,
        res.data.token
      );

      toast.success(
        "Login successful"
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-center mt-4">
          Don’t have an
          account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() =>
              navigate(
                "/register"
              )
            }
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;