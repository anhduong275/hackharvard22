import React from "react";
import "./App.css";
import LogIn from "./login";
import NavBar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <header>
        <div className="text-4xl font-black py-10">
          Household Task Allocator
        </div>
      </header>
      <div className="text-lg">
        <div className="flex justify-center">
          <NavBar></NavBar>
        </div>
        <LogIn></LogIn>
      </div>
    </div>
  );
}

export default App;
