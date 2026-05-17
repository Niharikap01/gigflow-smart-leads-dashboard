import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("sales");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
            role,
          }
        );

        toast.success(
          "Registration successful"
        );

        navigate("/login");
      } catch (error) {
        console.log(error);

        toast.error(
          "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={
          handleRegister
        }
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

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

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        >
          <option value="sales">
            Sales
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an
          account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() =>
              navigate(
                "/login"
              )
            }
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;