import React from "react";

const NavBar = () => {
  return (
    <div className="grid grid-cols-4 min-w-[50%] bg-sky-300 h-[50px]">
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/">Allocator</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        Repeating tasks
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        <a href="/login">Log in</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500 h-full flex justify-center items-center px-2">
        About us
      </div>
    </div>
  );
};

export default NavBar;
