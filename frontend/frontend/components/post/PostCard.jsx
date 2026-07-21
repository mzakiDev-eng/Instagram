"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SERVER_URL } from "../../lib/api";
import api from "../../lib/api";
import FollowButton from "../user/FollowButton";

const timeAgo = (dateString) => {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000,
  );
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(seconds / 3600);
  if (hours / 24) {
    return `${hours}h`;
  }
  const days = Math.floor(seconds / 86400);
  if (days < 7) {
    return `${days}d`;
  }
};
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.comment_count || 0);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [currentUserId] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")?.id
      : null
  );
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    try {
      const { data } = await api.post(`/likes/${post.id}`);
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (error) {
      setLiked(liked);
      setLikeCount(liked ? likeCount + 1 : likeCount - 1);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    setShowComments((prev) => !prev);

    if (!commentsLoaded) {
      try {
        const { data } = await api.get(`/comments/${post.id}`);

        setComments(data.comments);
        setCommentsLoaded(true);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setCommentLoading(true);

      const { data } = await api.post(`/comments/${post.id}`, {
        content: comment.trim(),
      });

      setComments((prev) => [...prev, data.comment]);
      setCommentCount((prev) => prev + 1);

      setComment("");
      setShowComments(true);
      setCommentsLoaded(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="  border border-gray-800 rounded-sm bg-black mb-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">
          {post.username?.[0]?.toUpperCase()}
        </div>
        <span className="text-white text-sm font-semibold">
          {post.username}
        </span>
        {String(currentUserId) !== String(post.user_id) && (
          <FollowButton
            userId={post.user_id}
            initialFollowing={post.is_following}
            initialFollowerCount={post.follower_count}
          />
        )}
        <span className="text-gray-500 text-xs ml-auto">
          {timeAgo(post.created_at)}
        </span>
      </div>

      <div className="w-full bg-neutral-900">
        <img
          src={`${SERVER_URL}${post.img_url}`}
          alt="post"
          className="w-full max-h-150 object-cover"
          quality={85}
        />
      </div>

      <div className="px-4 pt-3 flex items-center gap-4 text-2xl">
        <div className="flex items-center gap-1 cursor-pointer hover:-translate-y-0.5 transition">
          <button onClick={handleLike} disabled={loading}>
            {liked ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ed4956">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <Image src="/heart.svg" alt="Like" width={20} height={20} />
            )}
          </button>
          {likeCount > 0 && <span className="text-sm -top-2">{likeCount}</span>}
        </div>

        <div
          onClick={loadComments}
          className="flex items-center gap-1 cursor-pointer hover:-translate-y-0.5 transition"
        >
          <Image src="/chat.svg" alt="Chat" width={20} height={20} />

          {commentCount > 0 && <span className="text-sm">{commentCount}</span>}
        </div>
        <button className="cursor-pointer hover:-translate-y-0.5 ease-in-out transition">
          <Image src="/share.svg" alt="Share" width={20} height={20} />
        </button>
        <button className="ml-auto cursor-pointer hover:-translate-y-0.5 ease-in-out transition">
          <Image src="/save.svg" alt="Save" width={20} height={20} />
        </button>
      </div>

      {post.caption && (
        <div className="px-4 pt-1 pb-4 text-sm text-white">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.caption}
        </div>
      )}

      {showComments && (
        <div className="px-4 py-3 border-t border-gray-800">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm mb-3">No comments yet.</p>
          ) : (
            <div className="space-y-2 mb-3 ">
              {comments.map((item) => (
                <div key={item.id} className="text-sm text-white flex gap-1">
                  <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">
                    {item.username?.[0]?.toUpperCase()}
                  </span>
                  <span className="font-semibold mr-2 mt-1">{item.username}</span>
                  <span className="font-semibold mr-2 mt-1">{item.content}</span>
                  
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleComment}
            className="flex items-center border-t border-gray-700 pt-3"
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
            />

            <button
              type="submit"
              disabled={commentLoading || !comment.trim()}
              className="text-blue-500 font-semibold disabled:opacity-40"
            >
              {commentLoading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
