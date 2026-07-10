"use client";
import {useEffect , useState} from 'react';
import Image from "next/image";
import axios from 'axios' ;
export default function Home() {
  const [post , setPost] = useState([]);
  useEffect(() => {
   axios.get('http://localhost:5000/api/posts').then((res)=>{
    console.log(res.data);
    setPost(res.data.posts);
   })
   
  }, [])
  return (
      <div className="p-10">
        <h1 className='font-bold text-3xl w-64 mx-auto text-center '>Mini_Instagram</h1>
        {post.map((posts)=>(
          <div key={posts.id} className='border p-5 '>
            <img src={posts.url} className=" object-cover rounded-lg" />
            <p className='mt-2'>{posts.caption}</p>
          </div>

        ))}
        
      </div>
  );
}
