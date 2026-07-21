"use client";
import React, { useState } from "react";
import api from "../../lib/api";

const FollowButton = ({ userId, initialFollowing, initialFollowerCount }) => {
  const [following, setFollowing] = useState(initialFollowing || false);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount || 0);
  const [loading, setLoading] = useState(false);

  const handleFollow = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    const prevFollowing = following;
    const prevCount = followerCount;
    setFollowing(!prevFollowing);
    setFollowerCount(prevFollowing ? prevCount - 1 : prevCount + 1);

    try {
      const { data } = await api.get(`/users/follow/${userId}`);
      setFollowing(data.following);
      setFollowerCount(data.followerCount);
    } catch (error) {
      setFollowing(prevFollowing);
      setFollowerCount(prevCount);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleFollow}
        disabled={loading}
        className={`text-xs font-semibold px-3 py-1 flex gap-2 rounded-md transition disabled:opacity-50 ${
          following
            ? "bg-neutral-800 text-white border border-gray-700"
            : "bg-neutral-800 text-white border border-gray-700"
        }`}
      >
        {loading ? "..." : following ? "Following" : "Follow"}
        <span className=" text-white text-xs">{followerCount}</span>
      </button>
      
    </div>
  );
};

export default FollowButton;
