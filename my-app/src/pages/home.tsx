import React from "react";
import "../App.css";

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <ul className="text-left">
        <li className="text-lg py-2">
          Welcome to our task allocator! Below are instructions&#58;
        </li>
        <li>
          1. You can share this with your family/roommates to help allocate
          tasks
        </li>
        <li>2. Your daily tasks are saved, so no reentering your tasks!</li>
        <li>3. You can add daily tasks in the repeating tasks tab</li>
        <li>4. You can also add non-daily tasks in the allocator tab</li>
        <li>5. Our allocator randomly assigns your family members the tasks</li>
      </ul>
    </div>
  );
};

export default HomePage;
