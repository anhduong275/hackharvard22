import React from "react";

const AboutUs = () => {
  return (
    <>
      <div>We are Anh Duong & Charles Nguyen from Brown University.</div>
      <div>This is a life-hack tool to help you plan your daily tasks!</div>
      <div>Repeated tasks are tasks that are needed everyday.</div>
      <div>
        You can add non-recurring task to your repeating tasks to plan for your
        day!
      </div>
      <div className="flex justify-center py-4">
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex justify-center flex-col">
            <img
              width={350}
              height={350}
              src={"./IMG_2852.jpg"}
              alt="Anh Duong"
            ></img>
            <div>Anh Duong</div>
          </div>
          <div className="col-span-1 flex justify-center flex-col">
            <img
              width={350}
              height={350}
              src={"./IMG_2854.jpg"}
              alt="Charles Nguyen"
            ></img>
            <div>Charles Nguyen</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
