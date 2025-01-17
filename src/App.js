import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Chatbot from "./components/Chatbot";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <img src="/logo.png" alt="Chatbot Logo" className="logo" />
          <h1>AI Chatbot</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/chatbot">Chatbot</a></li>
            </ul>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
