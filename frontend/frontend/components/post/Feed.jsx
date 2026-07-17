"use client"
import React, { useEffect, useState } from 'react'
import Api from '../../lib/api' ;
import PostCard from './PostCard' ;
const Feed = () => {
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);
    const [posts , setPosts] = useState([]);

    const fetchPost = async () =>{
        try {
            const res = await Api.get("/posts");
            setPosts(res.data.posts);
        } catch (error) {
            setError(error.response?.data?.message || "Could not load feed.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPost();
    }, []);

  if (loading) {
    return <p className="text-gray-400 text-center text-sm py-6">Loading feed...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-sm py-6">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="text-gray-400 text-center text-sm py-6">
        No posts yet. Be the first to share something!
      </p>
    );
  }

  return (
    <div className="py-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Feed