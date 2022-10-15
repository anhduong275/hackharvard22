import React, {useState} from "react";
import "./App.css";
import LogIn from "./pages/login/login";
import NavBar from "./components/navbar";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
<<<<<<< HEAD
import RepeatingTasks from "./pages/repeating-tasks";
=======
import Dashboard from './components/dashboard';
import Preferences from './components/preferences';
import Login from "./pages/login/login";
>>>>>>> e3eece0 (login stufF??)

function App() {
  const [token, setToken] = useState({});


  
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
        <LogIn/>
        </div>
        
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
<<<<<<< HEAD
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/repeating-tasks" element={<RepeatingTasks />}></Route>
=======
        <Route path="/" element={<LogIn />}></Route>
>>>>>>> e3eece0 (login stufF??)
      </Routes>

    </div>
  );
}

export default App;
