import React from "react";
import "./App.css";
import LogIn from "./pages/login";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import RepeatingTasks from "./pages/repeating-tasks";
import Allocator from "./pages/allocator";
import AboutUs from "./pages/about-us";
import Users from "./pages/users";

function App() {
  return (
    <div className="App">
      <header>
        <div className="text-4xl font-black py-10">
          Household Task Allocator
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
        <Route path="/users" element={<Users />}></Route>
        <Route path="/repeating-tasks" element={<RepeatingTasks />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
