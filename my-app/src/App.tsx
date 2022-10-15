import React, {useState} from "react";
import "./App.css";
import LogIn from "./pages/login/login";
import NavBar from "./components/navbar";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import RepeatingTasks from "./pages/repeating-tasks";
import Dashboard from './components/dashboard';
import Preferences from './components/preferences';
import Login from "./pages/login/login";

function App() {
  const [token, setToken] = useState(-1);
  const [loggedIn, setLoggedIn] = useState(false);


  
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
        <div className="pt-10">
        </div>
        
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {!loggedIn ? <Route path="/login" element={<LogIn setToken={setToken} setLoggedIn={setLoggedIn}/>}></Route>
        : <Route path="/repeating-tasks" element={<RepeatingTasks />}></Route>}
        <Route path="/repeating-tasks" element={<RepeatingTasks />}></Route>
      </Routes>

    </div>
  );
}

export default App;
