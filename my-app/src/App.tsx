import React from "react";
import "./App.css";
import LogIn from "./pages/login";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import RepeatingTasks from "./pages/repeating-tasks";
import Allocator from "./pages/allocator";
import AboutUs from "./pages/about-us";

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <h1 className="text-4xl font-black pt-8">Household Task Allocator</h1>
          <h2 className="text-xl font-black pt-2 pb-8">
            Anh Duong & Charles Nguyen
          </h2>
        </div>
      </header>
      <div className="text-lg mb-8">
        <div className="flex justify-center">
          <NavBar></NavBar>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/allocator" element={<Allocator />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/repeating-tasks" element={<RepeatingTasks />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
