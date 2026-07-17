"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="w-full max-w-sm">
        <div className=" px-8 py-10 bg-black rounded-sm">
          <div className="text-3xl text-center text-white font-bold mb-8 tracking-wide">
            Mini_Instagram
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-80 px-2 py-1 rounded-xl border border-gray-700 hover:border-white -mt-1"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-80 px-2 py-1 rounded-xl border border-gray-700 hover:border-white -mt-1"
            />

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-md transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <div className=" mt-3 py-4 text-center bg-black rounded-sm">
          <span className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
