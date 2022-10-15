import React from "react";

const NavBar = () => {
  return (
    <div className="grid grid-cols-3 w-[50%] bg-sky-300 h-[50px] justify-center items-center">
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500">
        <a href="/">Allocator</a>
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500">
        Repeating tasks
      </div>
      <div className="col-span-1 hover:cursor-pointer hover:bg-sky-500">
        About us
      </div>
    </div>
  );
};

export default NavBar;
