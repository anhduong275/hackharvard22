import React from "react";

const NavBar = () => {
  return (
    <div className="grid grid-cols-5 min-w-[50%] bg-sky-300 h-[50px]">
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/">Home</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/allocator">Allocator</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/repeating-tasks">Repeating tasks</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/users">Users</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/about-us">About us</a>
      </div>
    </div>
  );
};

export default NavBar;
