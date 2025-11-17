import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/Admin/AdminPanel";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <SEO />
                <AdminPanel />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <SEO />
                <div className="min-h-screen bg-white dark:bg-gray-900">
                  <Navbar />
                  <Home />
                  <About />
                  <Skills />
                  <Project />
                  <Contact />
                  <Footer />
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
