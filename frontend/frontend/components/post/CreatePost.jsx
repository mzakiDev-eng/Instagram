"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

const CreatePost = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      setLoading(true);
      const res = await api.post("/posts", formData,{
          headers: {
    "Content-Type": "multipart/form-data",
  },
      });

      if (res.data.success) {
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="w-full max-w-sm border rounded-md px-8 py-10">
        <h2 className="text-white text-xl font-semibold text-center mb-6">
          Create new post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="w-full  border-gray-700 rounded-sm px-3 py-6 text-center text-gray-400 text-sm cursor-pointer">
            {file ? file.name : "Click to select an image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={3}
            className="w-full px-3 py-2 rounded-sm bg-neutral-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500"
          />

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600  text-white text-sm font-semibold py-2 rounded-md transition"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
