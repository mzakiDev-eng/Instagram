"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill the all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("kindly enter the 6 character");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      if (res.data.success) {
        router.push("/login");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="flex flex-col">
        <h3 className="flex flex-col font-bold text-3xl">
          Get started on Instagram
        </h3>
        <p className="text-xs">
          Sign up to see photos and videos from your friends
        </p>
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <p className="text-xs mt-2 ">Username</p>
          <input
            type="text"
            name="username"
            placeholder="enter the username"
            value={formData.username}
            onChange={handleChange}
            className="w-80 px-2 py-1 rounded-xl border border-gray-700 hover:border-white -mt-1"
          />
          <p className="text-[8px] mr-2 -mt-2 text-blue-500">
            You may receive notifications from us.
          </p>
          <p className="text-xs mt-2 ">Email</p>
          <input
            type="text"
            placeholder="enter the email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-80 px-2 py-1 rounded-xl border border-gray-700 hover:border-white -mt-1"
          />
          <p className="text-xs mt-2 ">Password</p>
          <input
            type="text"
            name="password"
            placeholder="enter the password"
            onChange={handleChange}
            value={formData.password}
            className="w-80 px-2 py-1 rounded-xl border border-gray-700 hover:border-white -mt-1"
          />
          <p className="text-[8px] -mt-2 text-gray-400">
            People who use our service may have uploaded your contact
            information to Instagram
          </p>
          <p className="text-[8px] mt-0.5 ">
            By tapping Submit, you agree to create an account?
          </p>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-md transition"
          >
            {loading ? "signUp..." : "submit"}
          </button>
        </form>
        <div className=" mt-3 py-4 text-center bg-black rounded-sm">
          <span className="text-gray-400 text-sm">
            Have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold">
              Log in
            </Link>
          </span>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default SignupForm;
