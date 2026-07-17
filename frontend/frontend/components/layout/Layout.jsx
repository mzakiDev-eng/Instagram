"use client"
import React from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link" ;
import Feed from "../post/Feed";
const Layout = () => {
    const pathname = usePathname();
  const menuItem = [
    { name: "Home", icon: "/home.svg" , href: "/" },
    { name: "Search", icon: "/search.svg" , href: "/search"},
    { name: "Reel", icon: "/play.svg" , href: "/reels" },
    { name: "Message", icon: "/message.svg", href: "/message" },
    { name: "Notification", icon: "/heart.svg", href: "/notification" },
    { name: "Create", icon: "/create.svg" , href: "/post" },
    { name: "Dashboard", icon: "/dashboard.svg" ,href: "/dashboard" },
  ];

  const stories = [
    
    { name: "Muhammad zaki" },
    { name: "David" },
    { name: "Jack" },
    { name: "Siman" },
   
  ];


  return (
    <div className=" flex min-h-screen">
      <aside className="sticky top-0 h-screen w-64  border-gray-700 px-4 py-8 flex flex-col">
        <div className="mb-10 ml-5">
          <Image
            src="/Instagram.png"
            alt="Instagram Logo"
            width={20}
            height={20}
            
          />
        </div>

        <nav className=" flex flex-col gap-2 text-lg">
          {menuItem.map((item) => {
            const isActive = pathname === item.href ;
            return (
            <Link
                key={item.name}
                href={item.href}
                className={`flex flex-row items-center gap-3 font-bold p-2 rounded-lg cursor-pointer transition ${
                  isActive 
                    ? "bg-gray-800 text-white" // Active page ka style
                    : "text-gray-300 hover:bg-gray-900 hover:text-white" // Normal style
                }`}
              >
              <Image src={item.icon} alt={item.name} width={24} height={24} />
              <span className="font-medium mt-1">{item.name}</span>
            </Link>
            );
})}

        </nav>
      </aside>
      <div className="flex  min-h-screen px-4 bg-black">
      <main className="flex-1 border-gray-700">
       
        <div className="flex items-start gap-4 overflow-x-auto py-4 border-b border-gray-800">
          {stories.map((story) => (
            <div
              key={story.name}
              className="flex flex-col items-center gap-1 shrink-0"
            >
              <div className="w-16 h-16 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-neutral-700"></div>
                </div>
              </div>
              <span className="text-xs text-gray-300 truncate w-16 text-center">
                {story.name}
              </span>
            </div>
          ))}
        </div>

        <Feed />
      </main>

      <aside className=" sticky h-screen top-0 w-80 px-4 py-6 ml-10">
        <h3 className="text-white font-semibold text-sm mb-4">
          Suggestions for you
        </h3>
        
      </aside>


      </div>

    </div>
  );
};

export default Layout;
