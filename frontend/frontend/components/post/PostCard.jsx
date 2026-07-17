"use client";
import React, { useState } from "react";
import Image from 'next/image'
import { SERVER_URL } from "../../lib/api";
import api from "../../lib/api";

const timeAgo = (dateString) => {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if(seconds < 60)
  {
    return `${seconds}s` 
  
  }
  const minutes = Math.floor(seconds/60);
  if(minutes < 60)
  {
    return `${minutes}m` ;
  }
  const hours = Math.floor(seconds /3600);
  if(hours / 24)
  {
    return `${hours}h`
  }
  const days = Math.floor(seconds/86400);
  if(days < 7)
  {
   return `${days}d`
  }
}
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.liked );
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [loading, setLoading] = useState(false);
   const handleLike = async () =>{
    if(loading)
    return
    setLoading(true)
    setLiked(!liked);
    setLikeCount(liked? likeCount-1 :likeCount + 1 );
    try {
      const {data}= await api.post(`/likes/${post.id}`);
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } 
    catch (error) {
      setLiked(liked);
      setLikeCount(liked ? likeCount +1 : likeCount-1);
      console.log(error.message)
    }
    finally {
  setLoading(false);
}

   }
  

  return (
    <div className="  border border-gray-800 rounded-sm bg-black mb-6 max-w-xl mx-auto">
   
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">
          {post.username?.[0]?.toUpperCase()}
        </div>
        <span className="text-white text-sm font-semibold">{post.username}</span>
        <span className="text-gray-500 text-xs ml-auto">{timeAgo(post.created_at)}</span>
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
        <div>
          <button
          onClick={handleLike}
          disabled={loading}
          className="cursor-pointer hover:-translate-y-0.5 ease-in-out transition disabled:opacity-60"
        >
          {liked ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#ed4956"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <Image src="/heart.svg" alt="Like" width={20} height={20} />
          )}
        </button>
           {
            likeCount > 0 &&
            <span className="text-sm -top-2">{likeCount}</span>
           }
        </div>
        
        <button className="cursor-pointer hover:-translate-y-0.5 ease-in-out transition">
          <Image
            src="/chat.svg"
            alt="Chat"
            width={20}
            height={20}
            
          />
        </button>
        <button className="cursor-pointer hover:-translate-y-0.5 ease-in-out transition">
          <Image
            src="/share.svg"
            alt="Share"
            width={20}
            height={20}
            
          /></button>
        <button className="ml-auto cursor-pointer hover:-translate-y-0.5 ease-in-out transition">
          <Image
            src="/save.svg"
            alt="Save"
            width={20}
            height={20}
            
          />
        </button>
      </div>

     

   
      {post.caption && (
        <div className="px-4 pt-1 pb-4 text-sm text-white">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.caption}
        </div>
      )}
    </div>
  );
};

export default PostCard ;
